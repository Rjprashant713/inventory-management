import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { add3Dots, capitalizeFirstLetter, customStyles } from "../utils/helper";
import Pagination from "./Paginations";
import RenderInstanceTable from "./RenderInstanceTable";
import Select from "react-select";

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
  const [instance, setInstance] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [itemCount, setItemCount] = useState(0);
  const [pageSize] = useState(25);
  const authToken = localStorage.getItem("authToken");

  // this API calling function is used for getting the listing data
  const fetchListingData = (awsAccount, region, service, pageNo = 1) => {
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
        if (service.toLowerCase() === "instance") {
          setInstance(true);
        } else {
          setInstance(false);
        }
        setListingData(filteredData);
        setItemCount(filteredData?.totalObject);
        setPageNo(pageNo);
        setLoader(false);
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
    setSelectedOptions((prevOptions) => {
      // Check if the selected option is the same as the current value
      if (prevOptions[option] === value) {
        return prevOptions; // Return early without making the API call
      }
      return {
        ...prevOptions,
        [option]: value,
      };
    });
  };

  // render listing data table of inventory
  const RenderTable = () => {
    const isArrayKey = (value) => Array.isArray(value) && value?.length > 0;

    const getArrayKey = (listingData) => {
      for (const key in listingData) {
        if (isArrayKey(listingData[key])) {
          return key;
        }
      }
      return null;
    };

    const rdsInstances = listingData?.rdsInstances;
    const isRdsInstancesValid =
      rdsInstances &&
      typeof rdsInstances === "object" &&
      Object.keys(rdsInstances)?.length > 0;

    const arrayKey = isRdsInstancesValid
      ? getArrayKey(listingData?.rdsInstances)
      : getArrayKey(listingData);

    if (!arrayKey) {
      return <p>No data available</p>;
    }

    const instances = isRdsInstancesValid
      ? rdsInstances[arrayKey]
      : listingData[arrayKey];
    if (instances?.length === 0) {
      return <p>No data available</p>;
    }

    return loader ? (
      <Loader />
    ) : instance ? (
      <RenderInstanceTable instanceData={instances} />
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
                    <div className="tooltip tooltip-bottom">
                      <span className="tooltip-text">
                        {typeof value === "object" && value !== null
                          ? Object.values(value).join(", ")
                          : String(value)}
                      </span>
                      {add3Dots(
                        typeof value === "object" && value !== null
                          ? Object.values(value).join(", ")
                          : String(value),
                        20
                      )}
                    </div>
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
    if (awsAccount && region && service) {
      fetchListingData(awsAccount, region, service, 1);
    }
    // eslint-disable-next-line
  }, [selectedOptions]);

  //for page change
  const onPaginationChange = (page) => {
    const { awsAccount, region, service } = selectedOptions;
    setPageNo(page);
    fetchListingData(awsAccount, region, service, page);
  };

  return (
    <div className="inventory-management">
      <div className="select-boxes">
        <div className="select-box">
          <label htmlFor="aws-account">Select AWS Account</label>
          <Select
            name="aws-account"
            id="aws-account"
            value={{
              value: selectedOptions.awsAccount,
              label: selectedOptions.awsAccount,
            }}
            onChange={(option) =>
              handleOptionChange("awsAccount", option.value)
            }
            options={awsAccounts.map((account) => ({
              value: account,
              label: account,
            }))}
            isSearchable={true}
            styles={customStyles}
          />
        </div>

        {/* Region select box */}
        <div className="select-box">
          <label htmlFor="region">Select Region</label>
          <Select
            name="region"
            id="region"
            value={{
              value: selectedOptions.region,
              label: selectedOptions.region,
            }}
            onChange={(option) => handleOptionChange("region", option.value)}
            options={[{ value: regions, label: regions }]}
            isSearchable={true}
            styles={customStyles}
          />
        </div>

        {/* Service select box */}
        <div className="select-box">
          <label htmlFor="service">Select a Service</label>
          <Select
            name="service"
            id="service"
            value={{
              value: selectedOptions.service,
              label: selectedOptions.service,
            }}
            onChange={(option) => handleOptionChange("service", option.value)}
            options={services.map((service) => ({
              value: service.serviceName,
              label: `${service.serviceName} (${service.count})`,
            }))}
            isSearchable={true}
            styles={customStyles}
          />
        </div>
      </div>
      <div className="listing">{<RenderTable />}</div>
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
