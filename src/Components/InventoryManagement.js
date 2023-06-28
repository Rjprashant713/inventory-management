import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { capitalizeFirstLetter } from "../utils/helper";
import { Cookies } from "react-cookie";
import Pagination from "./Paginations";

const InventoryManagement = () => {
  // local useState to store info
  const [awsAccounts, setAwsAccounts] = useState([]);
  const [regions, setRegions] = useState([]);
  const [services, setServices] = useState([]);
  const [loader, setLoader] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({
    awsAccount: "",
    region: "",
    service: "",
  });
  const [listingData, setListingData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [itemCount, setItemCount] = useState(0);
  const [pageSize] = useState(25);
  const cookie = new Cookies();
  const authToken = cookie.get("authToken");

  // func to show dotted format data in table
  const add3Dots = (string, limit) => {
    var dots = "...";
    if (string && string?.length > limit) {
      string = string.substring(0, limit) + dots;
    }
    return string;
  };

  // this API calling function is used for getting the listing data
  const fetchListingData = (awsAccount, region, service,pageNo=1) => {
    setLoader(true);
    const apiUrl = `/aws/inventory/${awsAccount}?region=${region}&objectType=${service.toLowerCase()}&limit=25&offset=${pageNo}`; //&sort_by=instanceId-asc

    fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Basic ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const filteredData = Object.fromEntries(
          Object.entries(data).filter(([_, value]) => !!value)
        );
        setListingData(filteredData);
        setItemCount(filteredData?.totalObject)
        setLoader(false);
        // console.log("ListingData", filteredData);
      })
      .catch((error) => {
        console.error("Error fetching listing data:", error);
        setLoader(false);
      });
  };

  //this function will call after fetchAwsAccounts() function to get region and services based on awsAccount
  const fetchRegions = (awsAccount) => {
    fetch(`/aws/inventory/regions/${awsAccount}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Basic ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRegions(data[0]?.region);
        setServices(data[0]?.availableService);
        setSelectedOptions((prevOptions) => ({
          ...prevOptions,
          region: data[0]?.region || "",
          service: data[0]?.availableService[0]?.serviceName || "",
        }));
      })
      .catch((error) => {
        console.error("Error fetching regions:", error);
      });
  };

  //used to get AwsAccounts on page load
  const fetchAwsAccounts = () => {
    fetch("/common/application?agent=AWS", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Basic ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        const filteredAccounts = responseData.map((data) => data.host);
        setAwsAccounts(filteredAccounts);
        if (filteredAccounts.length > 0) {
          fetchRegions(filteredAccounts[0]); // Fetch regions for the default AWS account
          setSelectedOptions((prevOptions) => ({
            ...prevOptions,
            awsAccount: filteredAccounts[0],
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching AWS accounts:", error);
      });
  };

  const handleOptionChange = (option, value) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [option]: value,
    }));
  };

  // render listing data table of inventory
  const RenderTable = () => {
    const isArrayKey = (value) => Array.isArray(value);

    const getArrayKey = () => {
      for (const key in listingData) {
        if (isArrayKey(listingData[key])) {
          return key;
        }
      }
      return null;
    };

    const arrayKey = getArrayKey();

    if (!arrayKey) {
      return <p>No data available</p>;
    }

    const instances = listingData[arrayKey];
    // console.log("instances", instances);
    if (instances.length === 0) {
      return <p>No data available</p>;
    }

    

    return loader ? (
      <Loader />
    ) : (
      <div className="custom-table-container">
        <table className="custom-table">
          <thead>
            <tr>
              {Object.keys(instances[0])?.map((key) => (
                <th key={key}>{capitalizeFirstLetter(key)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {instances?.map((instance, index) => (
              <tr key={index}>
                {Object.values(instance)?.map((value, idx) => (
                  <td key={idx} className="col-sm-6 tooltipHover">
                    {typeof value === "object" && value !== null ? (
                      <div className="tooltip tooltip-bottom">
                        <span className="tooltip-text">
                          {Object.values(value).join(", ")}
                        </span>
                        {add3Dots(Object.values(value).join(", "), 20)}
                      </div>
                    ) : (
                      <div className="tooltip tooltip-bottom">
                        <span className="tooltip-text">{value}</span>
                        {add3Dots(value, 20)}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // called initially on page load to get AwsAccounts...
  useEffect(() => {
    fetchAwsAccounts();
    // eslint-disable-next-line
  }, []);

  // this useEffect will be called to render listing data once all dependency get..
  useEffect(() => {
    const { awsAccount, region, service } = selectedOptions;
    // console.log("selectOptions", selectedOptions);
    if (awsAccount && region && service) {
      fetchListingData(awsAccount, region, service);
    }
    // eslint-disable-next-line
  }, [selectedOptions]);

  //for page change
  const onPaginationChange = (page) => {
    const { awsAccount, region, service } = selectedOptions;
    setPageNo(page);
    fetchListingData(awsAccount, region, service,page);
    };
    

  return (
    <div className="inventory-management">
      {/* Select boxes */}
      <div className="select-boxes">
        {/* AWS Account select box */}
        <div className="select-box">
          <label htmlFor="aws-account">Select AWS Account</label>
          <select
            name="aws-account"
            id="aws-account"
            value={selectedOptions.awsAccount}
            onChange={(e) => handleOptionChange("awsAccount", e.target.value)}
          >
            {awsAccounts?.map((account, index) => (
              <option key={index} value={account}>
                {account}
              </option>
            ))}
          </select>
        </div>

        {/* Region select box */}
        <div className="select-box">
          <label htmlFor="region">Select Region</label>
          <select
            name="region"
            id="region"
            value={selectedOptions.region}
            onChange={(e) => handleOptionChange("region", e.target.value)}
          >
            <option value={regions}>{regions}</option>
          </select>
        </div>

        {/* Service select box */}
        <div className="select-box">
          <label htmlFor="service">Select a Service</label>
          <select
            name="service"
            id="service"
            value={selectedOptions.service}
            onChange={(e) => handleOptionChange("service", e.target.value)}
          >
            {services?.map((service, index) => (
              <option key={index} value={service.serviceName}>
                {service.serviceName} ({service.count})
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="listing">
        {<RenderTable />}
      </div>
      {itemCount > 25 && (
        <div className="pagination">
            <Pagination
                current={pageNo}
                onChange={onPaginationChange}
                count={itemCount}
                size={pageSize}
            ></Pagination>
        </div>
       )}
    </div>
  );
};

export default InventoryManagement;
