<TableCell component="th" scope="row">
  <div className="col-sm-6 tooltipHover">
    {packageItem && packageItem.title !== "" && (
      <div class="tooltip tooltip-bottom">{`${
        packageItem && packageItem.title ? packageItem.title : ""
      }`}</div>
    )}
    {add3Dots(packageItem.title, 30)}
  </div>
</TableCell>;
const add3Dots = (string, limit) => {
    var dots = "...";
    if (string && string.length > limit) {
      string = string.substring(0, limit) + dots;
    }
    return string;
  };

/*
.tooltipHover:hover .tooltip {
  display: block;
  position: absolute;
  bottom: 20px;
  opacity: 1;
}
.tooltip {
  font-size: 14px;
  border: 3px solid #ccc;
  padding: 5px 5px;
  background-color: #fff;
  width: 15vw;
  margin: 2em auto;
  text-align: center;
  display: none;
}

.tooltip-bottom::before {
  content: "";
  position: absolute;
  display: block;
  width: 0px;
  left: 50%;
  bottom: 0;
  border: 8px solid transparent;
  border-bottom: 0;
  border-top: 8px solid #ccc;
  transform: translate(-50%, calc(100% + 3px));
}
*/

// import React from 'react';

// const InventoryManagement = () => {
//   // Static data for select box options
//   const categories = ['Category 1', 'Category 2', 'Category 3'];
//   const locations = ['Location 1', 'Location 2', 'Location 3'];
//   const statuses = ['Status 1', 'Status 2', 'Status 3'];

//   return (
//     <div className="inventory-management">
//       <h2>Inventory Management</h2>

//       {/* Select boxes */}
//       <div className="select-boxes">
//         <div className="select-box">
//           <label htmlFor="category">Select AWS Account</label>
//           <select name="category" id="category">
//             {categories.map((category, index) => (
//               <option key={index} value={category}>{category}</option>
//             ))}
//           </select>
//         </div>

//         <div className="select-box">
//           <label htmlFor="location">Select Region</label>
//           <select name="location" id="location">
//             {locations.map((location, index) => (
//               <option key={index} value={location}>{location}</option>
//             ))}
//           </select>
//         </div>

//         <div className="select-box">
//           <label htmlFor="status">Select a Service</label>
//           <select name="status" id="status">
//             {statuses.map((status, index) => (
//               <option key={index} value={status}>{status}</option>
//             ))}
//           </select>
//         </div>
//       </div>

// .listing-table {
//     width: 100%;
//     border-collapse: collapse;
//   }
  
//   .listing-table th,
//   .listing-table td {
//     padding: 10px;
//     text-align: left;
//     border-bottom: 1px solid #ccc;
//   }
  
//   .listing-table th {
//     background-color: #f2f2f2;
//     font-weight: bold;
//   }
  
//   .listing-table td {
//     font-size: 14px;
//   }
  
//   .listing-table tbody tr:nth-child(even) {
//     background-color: #f9f9f9;
//   }
  
//   .listing-table tbody tr:hover {
//     background-color: #74d4f7;  
//     /* eaeaea */
//   }

    //   {/* Listing table */}
    //   <table className="listing-table">
    //     <thead>
    //       <tr>
    //         <th>Column 1</th>
    //         <th>Column 2</th>
    //         <th>Column 3</th>
    //         <th>Column 4</th>
    //         <th>Column 5</th>
    //         <th>Column 6</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {/* Table rows */}
    //       <tr>
    //         <td>Data 1</td>
    //         <td>Data 2</td>
    //         <td>Data 3</td>
    //         <td>Data 4</td>
    //         <td>Data 5</td>
    //         <td>Data 6</td>
    //       </tr>
    //       <tr>
    //         <td>Data 1</td>
    //         <td>Data 2</td>
    //         <td>Data 3</td>
    //         <td>Data 4</td>
    //         <td>Data 5</td>
    //         <td>Data 6</td>
    //       </tr>
    //       {/* Add more rows as needed */}
    //     </tbody>
    //   </table>
//     </div>
//   );
// };

// export default InventoryManagement;

// import React, { useState, useEffect } from 'react';

// const InventoryManagement = () => {
//   const [awsAccounts, setAwsAccounts] = useState([]);
//   const [regions, setRegions] = useState([]);
//   const [services, setServices] = useState([]);

//   useEffect(() => {
//     fetchAwsAccounts();
//   }, []);

//   const fetchRegions = (awsAccount) => {
//     console.log("Hello")
//     fetch(`/aws/inventory/regions/${awsAccount}`, {
//       method: 'GET',
//       headers: {
//         'Accept': 'application/json',
//         'Authorization': 'Basic bmltZXNhOjMzZmUyNjU4ZWE3ZjFmNzA3ZmNhMDAyNmY3NmIyYWNiOjphYmFmNDM3ZDRiNDJiNjM4MTAzNjNhOTdkNjc0ZWI3Zjo6Y3RFMjlnT2wwbGZaRG02aDRHd0Yrdz09',
//         'Access-Control-Allow-Origin': 'https://app.nimesa.io',
//         // 'X-Proxy-URL': `https://localhost:9443/aws/inventory/regions/${awsAccount}`
//       }
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log("Hello",data[0])
//         setRegions(data[0]?.region);
//         setServices(data[0]?.availableService);
//         console.log("Region",data[0]?.region)
//         console.log("Service",data[0]?.availableService);
//       })
//       .catch(error => {
//         console.error('Error fetching regions:', error);
//       });
//   };

//   const fetchAwsAccounts = () => {
//     fetch('/common/application?agent=AWS', {
//       method: 'GET',
//       headers: {
//         'Accept': 'application/json',
//         'Authorization': 'Basic bmltZXNhOjMzZmUyNjU4ZWE3ZjFmNzA3ZmNhMDAyNmY3NmIyYWNiOjphYmFmNDM3ZDRiNDJiNjM4MTAzNjNhOTdkNjc0ZWI3Zjo6Y3RFMjlnT2wwbGZaRG02aDRHd0Yrdz09',
//         'Access-Control-Allow-Origin': 'https://app.nimesa.io',
//         'X-Proxy-URL': 'https://localhost:9443/common/application'
//       }
//     })
//       .then(response => response.json())
//       .then(responseData => {
//         const filteredAccounts = responseData.map(data => data.host);
//         setAwsAccounts(filteredAccounts);
//         console.log("filteredAccounts",filteredAccounts);
//         if (filteredAccounts.length > 0) {
//           fetchRegions(filteredAccounts[0]); // Fetch regions for the default AWS account
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching AWS accounts:', error);
//       });
//   };

  

//   return (
//     <div className="inventory-management">
//       <h2>Inventory Management</h2>

//       {/* Select boxes */}
//       <div className="select-boxes">
//         {/* AWS Account select box */}
//         <div className="select-box">
//           <label htmlFor="aws-account">Select AWS Account</label>
//           <select name="aws-account" id="aws-account" onChange={(e) => fetchRegions(e.target.value)}>
//             {awsAccounts?.map((account, index) => (
//               <option key={index} value={account}>{account}</option>
//             ))}
//           </select>
//         </div>

//         {/* Region select box */}
//         <div className="select-box">
//           <label htmlFor="region">Select Region</label>
//           <select name="region" id="region" value={regions} onChange={(e) => setRegions(e.target.value)}>
//             <option value={regions}>{regions}</option>
//           </select>
//         </div>

    //     {/* Service select box */}
    //     <div className="select-box">
    //       <label htmlFor="service">Select a Service</label>
    //       <select name="service" id="service">
    //         {services?.map((service, index) => (
    //           <option key={index} value={service.serviceName}>
    //             {service.serviceName} ({service.count})
    //           </option>
    //         ))}
    //       </select>
    //     </div>
    //   </div>

//            {/* Listing table */}
//            <table className="listing-table">
//         <thead>
//           <tr>
//             <th>Column 1</th>
//             <th>Column 2</th>
//             <th>Column 3</th>
//             <th>Column 4</th>
//             <th>Column 5</th>
//             <th>Column 6</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* Table rows */}
//           <tr>
//             <td>Data 1</td>
//             <td>Data 2</td>
//             <td>Data 3</td>
//             <td>Data 4</td>
//             <td>Data 5</td>
//             <td>Data 6</td>
//           </tr>
//           <tr>
//             <td>Data 1</td>
//             <td>Data 2</td>
//             <td>Data 3</td>
//             <td>Data 4</td>
//             <td>Data 5</td>
//             <td>Data 6</td>
//           </tr>
//           {/* Add more rows as needed */}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default InventoryManagement;

// import React, { useState, useEffect } from 'react';

// const InventoryManagement = () => {
//   const [awsAccounts, setAwsAccounts] = useState([]);
//   const [regions, setRegions] = useState([]);
//   const [services, setServices] = useState([]);
//   const [selectedOptions, setSelectedOptions] = useState({
//     awsAccount: '',
//     region: '',
//     service: ''
//   });
//   const [listingData, setListingData] = useState([]);

 

//   const fetchListingData = (awsAccount, region, service) => {
//     const apiUrl = `/aws/inventory/${awsAccount}?region=${region}&objectType=${service}&limit=25&offset=0&sort_by=name-asc`;

//     fetch(apiUrl, {
//       method: 'GET',
//       headers: {
//         'Access-Control-Allow-Origin': 'https://app.nimesa.io',
//         'Authorization': 'Basic bmltZXNhOmFkNDQ5NDU0ZDAxYmIxOWQ3MWNmZWNiM2Q4NWUwZTdiOjozMTViYTUyMDVjNTBiZWExYzk1ZGY3MjkxOWVhOWJlNTo6b1BvalRMa0JjN0ViRlE1b01IWGVrUT09',
//         // 'X-Proxy-URL': `https://localhost:9443/aws/inventory/${awsAccount}`,
//       }
//     })
//       .then(response => response.json())
//       .then(data => {
//         setListingData(data);
//         console.log("ListingData",data);
//       })
//       .catch(error => {
//         console.error('Error fetching listing data:', error);
//       });
//   };

//   const fetchRegions = (awsAccount) => {
//     fetch(`/aws/inventory/regions/${awsAccount}`, {
//       method: 'GET',
//       headers: {
//         'Accept': 'application/json',
//         'Authorization': 'Basic bmltZXNhOjMzZmUyNjU4ZWE3ZjFmNzA3ZmNhMDAyNmY3NmIyYWNiOjphYmFmNDM3ZDRiNDJiNjM4MTAzNjNhOTdkNjc0ZWI3Zjo6Y3RFMjlnT2wwbGZaRG02aDRHd0Yrdz09',
//         'Access-Control-Allow-Origin': 'https://app.nimesa.io',
//         // 'X-Proxy-URL': `https://localhost:9443/aws/inventory/regions/${awsAccount}`
//       }
//     })
//       .then(response => response.json())
//       .then(data => {
//         setRegions(data[0]?.region);
//         setServices(data[0]?.availableService);
//       })
//       .catch(error => {
//         console.error('Error fetching regions:', error);
//       });
//   };

//   const fetchAwsAccounts = () => {
//     fetch('/common/application?agent=AWS', {
//       method: 'GET',
//       headers: {
//         'Accept': 'application/json',
//         'Authorization': 'Basic bmltZXNhOjMzZmUyNjU4ZWE3ZjFmNzA3ZmNhMDAyNmY3NmIyYWNiOjphYmFmNDM3ZDRiNDJiNjM4MTAzNjNhOTdkNjc0ZWI3Zjo6Y3RFMjlnT2wwbGZaRG02aDRHd0Yrdz09',
//         'Access-Control-Allow-Origin': 'https://app.nimesa.io',
//         'X-Proxy-URL': 'https://localhost:9443/common/application'
//       }
//     })
//       .then(response => response.json())
//       .then(responseData => {
//         const filteredAccounts = responseData.map(data => data.host);
//         setAwsAccounts(filteredAccounts);
//         if (filteredAccounts.length > 0) {
//           fetchRegions(filteredAccounts[0]); // Fetch regions for the default AWS account
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching AWS accounts:', error);
//       });
//   };

//   const handleOptionChange = (option, value) => {
//     setSelectedOptions(prevOptions => ({
//       ...prevOptions,
//       [option]: value
//     }));
//   };

//   useEffect(() => {
//     fetchAwsAccounts();
//   }, []);

//   useEffect(() => {
//     const { awsAccount, region, service } = selectedOptions;
//     console.log("selectOptions",selectedOptions);
//     if (awsAccount && region && service) {
//       fetchListingData(awsAccount, region, service);
//     }
//   }, [selectedOptions]);

//   return (
//     <div className="inventory-management">
//       <h2>Inventory Management</h2>

//       {/* Select boxes */}
//       <div className="select-boxes">
//         {/* AWS Account select box */}
//         <div className="select-box">
//           <label htmlFor="aws-account">Select AWS Account</label>
//           <select name="aws-account" id="aws-account" onChange={(e) => handleOptionChange('awsAccount', e.target.value)}>
//             {awsAccounts?.map((account, index) => (
//               <option key={index} value={account}>{account}</option>
//             ))}
//           </select>
//         </div>

        // {/* Region select box */}
        // <div className="select-box">
        //   <label htmlFor="region">Select Region</label>
        //   <select name="region" id="region"  onChange={(e) => handleOptionChange('region', e.target.value)}>
        //     <option value={regions}>{regions}</option>
        //   </select>
        // </div>

//         {/* Service select box */}
//         <div className="select-box">
//           <label htmlFor="service">Select a Service</label>
//           <select name="service" id="service" onChange={(e) => handleOptionChange('service', e.target.value)}>
//           {services?.map((service, index) => (
//               <option key={index} value={service.serviceName}>
//                 {service.serviceName} ({service.count})
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Listing */}
//       <div className="listing">
//         <h3>Listing Data</h3>
//         <ul>
//           {listingData?.map((item, index) => (
//             <li key={index}>{item.name}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default InventoryManagement;

//   const RenderTable = () => {
//     const isArrayKey = (value) => Array.isArray(value);

//     const getArrayKey = () => {
//         for (const key in listingData) {
//         if (isArrayKey(listingData[key])) {
//             return key;
//         }
//         }
//         return null;
//     };

//     const arrayKey = getArrayKey();

//     if (!arrayKey) {
//         return <p>No data available</p>;
//     }

//     const instances = listingData[arrayKey];
//     console.log("instances", instances);
//     if (instances.length === 0) {
//       return <p>No data available</p>;
//     }

//     const capitalizeFirstLetter = (string) => {
//         return string.charAt(0).toUpperCase() + string.slice(1);
//     };
  
//     return (
        
//       <table className="custom-table">
//         <thead>
//           <tr>
//             {Object.keys(instances[0])?.map((key) => (
//               <th key={key}>{capitalizeFirstLetter(key)}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {instances?.map((instance, index) => (
//             <tr key={index}>
//               {Object.values(instance)?.map((value, idx) => (
//                 <td key={idx}>
//                   {typeof value === "object" && value !== null
//                     ? Object.values(value).join(", ")
//                     : value}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
      
//     );
//   };
   {/* {instances?.map((instance, index) => (
              <tr key={index}>
                {Object.values(instance)?.map((value, idx) => (
                  <td key={idx}>
                    {typeof value === "object" && value !== null
                      ? add3Dots(Object.values(value).join(", "),20)
                      : add3Dots(value,20)}
                  </td>
                ))}
              </tr>
            ))} */}


            // const AppRoutes = () => {
//   return (
//     <Switch>
//       <Route path="/" exact>
//         <BlankLayout>
//           <Login />
//         </BlankLayout>
//       </Route>
//       <Route path="/dashboard" exact>
//         <DefaultLayout>
//           <Dashboard />
//         </DefaultLayout>
//       </Route>
//       <Route path="/dashboard/welcome-user" exact>
//         <DefaultLayout>
//           <WelcomeUser />
//         </DefaultLayout>
//       </Route>
//       <Route path="/dashboard/inventory" exact>
//         <DefaultLayout>
//           <InventoryManagement />
//         </DefaultLayout>
//       </Route>
//     </Switch>
//   );
// };

// export default AppRoutes;

/* table styling
  .custom-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .custom-table th,
  .custom-table td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  .custom-table th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
  
  .custom-table tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .custom-table tbody tr:hover {
    background-color: #e6e6e6;
  }
   */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     // Perform validation
//     if (name.trim() === "") {
//       setErrorMessage("Please enter your name.");
//     } else if (password.length < 6) {
//       setErrorMessage("Password should be at least 6 characters long.");
//     } else {
//       const username = "nimesa";
//       const authString = "14c4d2a7f39d02b467158d2b06c0134f::bd11fec9d0805f8cb49f87c5361974bd::3ifSeJUaKxVb41QJV6QXNA==";
//       const encodedAuthString = btoa(`${username}:${authString}`);
//       console.log("encodedAuthString",encodedAuthString)
  
//       try {
//         const response = await fetch("/home/login", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Basic ${encodedAuthString}`,
//             // "Cookie": "JSESSIONID=62689ED3EFCE111029FF7DC0F2C27D3C; JSESSIONID=388BFD369C31CBF2F84A0FD6963F4256"
//           },
//           body: JSON.stringify({}),
//         });
//         console.log("responseData",response);
  
//         if (response.ok) {
//           // Handle successful API call
//           alert("You have successfully logged in to Nimesa");
//           props.history.push("/dashboard/welcome-user");
//           setErrorMessage("");
//           // Reset form fields
//           setName("");
//           setPassword("");
//         } else {
//           // Handle API call error
//           const data = await response.json();
//           setErrorMessage(data.error || "Something went wrong.");
//         }
//       } catch (error) {
//         // Handle fetch error
//         console.log(error);
//         setErrorMessage("An error occurred. Please try again later.");
//       }
//     }
//   };
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     // Perform validation
//     if (name.trim() === "") {
//       setErrorMessage("Please enter your name.");
//     } else if (password.length < 6) {
//       setErrorMessage("Password should be at least 6 characters long.");
//     } else {
//         const encodeVal = "nimesa:bmltZXNhOjE0YzRkMmE3ZjM5ZDAyYjQ2NzE1OGQyYjA2YzAxMzRmOjpiZDExZmVjOWQwODA1ZjhjYjQ5Zjg3YzUzNjE5NzRiZDo6M2lmU2VKVWFLeFZiNDFRSlY2UVhOQT09"
//       try {
//         const response = await fetch("https://20.244.6.106:9443/home/login", {
//           method: "POST",
//           headers: {
//             // "Accept": "application/json, text/javascript, */*; q=0.01",
//             "Content-Type": "application/json",
//             // "Accept-Language": "en-US,en;q=0.9",
//             // "Access-Control-Allow-Headers": "Origin",
//             // "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
//             // "Access-Control-Allow-Origin": "https://app.nimesa.io",
//             Authorization: `Basic ${encodeVal}`,
//             // "Connection": "keep-alive",
//             // "Content-Type": "application/json; charset=utf-8",
//             // "Referer": "https://app.nimesa.io",
//             // "Sec-Fetch-Dest": "empty",
//             // "Sec-Fetch-Mode": "cors",
//             // "Sec-Fetch-Site": "same-origin",
//             // "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
//             // "X-Proxy-URL": "https://localhost:9443/home/login",
//             // "sec-ch-ua": "\"Google Chrome\";v=\"111\", \"Not(A:Brand\";v=\"8\", \"Chromium\";v=\"111\"",
//             // "sec-ch-ua-mobile": "?0",
//             // "sec-ch-ua-platform": "\"Windows\"",
//             // "Cookie": "JSESSIONID=62689ED3EFCE111029FF7DC0F2C27D3C; JSESSIONID=388BFD369C31CBF2F84A0FD6963F4256"
//           },
//           body: JSON.stringify({
//             name: name,
//             password: password
//           }),
//         });
//         console.log("Response=",response);
  
//         if (response.ok) {
//           // Handle successful API call
//           alert("You have successfully logged in to Nimesa");
//           props.history.push("/welcome-user");
//           setErrorMessage("");
//           // Reset form fields
//           setName("");
//           setPassword("");
//         } else {
//           // Handle API call error
//           const data = await response.json();
//           setErrorMessage(data.error || "Something went wrong.");
//         }
//       } catch (error) {
//         // Handle fetch error
//         setErrorMessage("An error occurred. Please try again later.");
//       }
//     }
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     // Perform validation
//     if (name.trim() === '') {
//       setErrorMessage('Please enter your name.');
//     } else if (password.length < 6) {
//       setErrorMessage('Password should be at least 6 characters long.');
//     } else {
//       const apiUrl = 'home/login';
//       const username = 'nimesa';
//       const authString =
//         '14c4d2a7f39d02b467158d2b06c0134f::bd11fec9d0805f8cb49f87c5361974bd::3ifSeJUaKxVb41QJV6QXNA==';
//       const encodedAuthString = btoa(`${username}:${authString}`);
  
//       try {
//         const response = await fetch(apiUrl, {
//           method: 'POST',
//           headers: {
//             'Accept': 'application/json, text/javascript, */*; q=0.01',
//             'Accept-Language': 'en-US,en;q=0.9',
//             'Access-Control-Allow-Headers': 'Origin',
//             'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
//             'Access-Control-Allow-Origin': 'https://app.nimesa.io',
//             'Connection': 'keep-alive',
//             'Content-Type': 'application/json; charset=utf-8',
//             'Referer': 'https://app.nimesa.io/inventory',
//             'Sec-Fetch-Dest': 'empty',
//             'Sec-Fetch-Mode': 'cors',
//             'Sec-Fetch-Site': 'same-origin',
//             'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
//             'X-Proxy-URL': 'https://localhost:9443/aws/inventory/Nimesa-ORG',
//             'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
//             'sec-ch-ua-mobile': '?0',
//             'sec-ch-ua-platform': '"Windows"',
//             'Authorization': `Basic ${encodedAuthString}`,
//             'Cookie': 'JSESSIONID=327236A3FF38AF1DEE36BAB82F422BB9; JSESSIONID=950D96D658A66A2CB5E82DC601E1A4AD',
//           },
//           body: JSON.stringify({}),
//         });
  
//         if (response.ok) {
//           // Handle successful API call
//           const responseData = await response.json();
//           alert('You have successfully logged in to Nimesa');
//           console.log('data=', responseData);
//           history.push('/dashboard/welcome-user');
//           setErrorMessage('');
//           // Reset form fields
//           setName('');
//           setPassword('');
//         } else {
//           // Handle API call error
//           const data = await response.json();
//           setErrorMessage(data.error || 'Something went wrong.');
//         }
//       } catch (error) {
//         // Handle fetch error
//         console.log(error);
//         setErrorMessage('An error occurred. Please try again later.');
//       }
//     }
//   };



// import React, { useEffect } from 'react';
// import Navbar from './Navbar';
// import MainSidebar from './MainSideBar';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// const DefaultLayout = ({ children }) => {
//     const history = useHistory();
// useEffect(() => {
//     const loginTime = new Date().getTime(); // Get the login time in milliseconds

//     const logoutUser = () => {
//       history.push("/logout")
//     };

//     const checkLogoutTime = () => {
//       const currentTime = new Date().getTime(); // Get the current time in milliseconds
//       const elapsedTime = currentTime - loginTime; // Calculate the elapsed time

//       if (elapsedTime > 60000) {
//         // 300000 milliseconds = 5 minutes
//         logoutUser(); // Call the logout function if the elapsed time exceeds 5 minutes
//       }
//     };

//     const logoutTimer = setInterval(checkLogoutTime, 1000); // Check logout time every second

//     return () => {
//       clearInterval(logoutTimer); // Clean up the interval when the component unmounts
//     };
//   }, []); // Empty dependency array ensures the effect runs only once on component mount

//   return (
//     <>
//       <Navbar />
//       <div className="dashboard-container">
//         <MainSidebar />
//         <div className="dashboard-content">{children}</div>
//       </div>
//     </>
//   );
// };

// export default DefaultLayout;
