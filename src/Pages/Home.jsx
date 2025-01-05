import axios from 'axios';
import React, { useState } from 'react';
import Toastify from 'toastify-js';

const url = process.env.REACT_APP_API_URL;
function Home() {
  const [Vdata, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [UData, setUData] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [user_id, setUserId] = useState("");
  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [type, setType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showAddTransactionForm, setShowAddTransactionForm] = useState(false);
  const [showFilterForm, setShowFilterForm] = useState(false);
  const [showUsergetForm, setshowUsergetForm] = useState(false);



  const handlegetUser = (e) => {
    e.preventDefault();
    axios.post(`${url}/user/filter`, {userId:user_id, status, type, fromDate, toDate })
      .then((response) => { setUData(response.data.transactions)
       console.log(response.data.transactions)}

       )
      
      .catch(error => console.error("Error filtering transactions:", error));
  };


  const viewAll = () => {
    axios.get(`${url}/viewall`)
      .then((response )=>{setData(response.data.transactions)
      console.log(response.data.transactions)}
    )
      .catch(error => console.error("Error fetching all transactions:", error));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    axios.post(`${url}/Add`, { name, phone })
      .then(response => {
        Toastify({
          text: response.data.message,
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
        }).showToast();
        setName("");
        setPhone("");
        setShowAddUserForm(false);
      })
      .catch(error => console.error("Error adding user:", error));
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    axios.post(`${url}/tadd`, { user_id, status, transactionDate, amount, type })
      .then(response => {
        Toastify({
          text: response.data.message,
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
        }).showToast();
        setUserId("");
        setStatus("");
        setTransactionDate("");
        setAmount("");
        setType("");
        setShowAddTransactionForm(false);
      })
      .catch(error => console.error("Error adding transaction:", error));
  };

  const handleFilterTransactions = (e) => {
    e.preventDefault();
    axios.post(`${url}/filter`, { status, type, fromDate, toDate })
      .then((response) => {setFilterData(response.data.transactions )
       console.log(filterData)}

       )
      
      .catch(error => console.error("Error filtering transactions:", error));
  };

  return (
    <div className="bg-white-500" >
      <button onClick={() => setShowAddUserForm(!showAddUserForm)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300">Add User</button>
      {showAddUserForm && (
        <form onSubmit={handleAddUser}>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300">Add User</button>
        </form>
      )}

      <button onClick={() => setShowAddTransactionForm(!showAddTransactionForm)} >Add Transaction</button>
      {showAddTransactionForm && (
        <form onSubmit={handleAddTransaction}>
          <input
            type="text"
            placeholder="User ID"
            value={user_id}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <input
            type="date"
            placeholder="Transaction Date"
            value={transactionDate}
            onChange={(e) => setTransactionDate(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Transaction Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300">Add Transaction</button>
        </form>
      )}

      <button onClick={() => setShowFilterForm(!showFilterForm)}className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-blue-600">Filter Transactions</button>
      {showFilterForm && (
        <form onSubmit={handleFilterTransactions}>
          <input
            type="text"
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          <input
            type="date"
            placeholder="From Date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="date"
            placeholder="To Date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Transaction Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300">Filter Transactions</button>
        </form>
      )}

    <div>
      <h2>Transactions</h2>
      {filterData.length === 0 ? (
        <p>No transactions available</p>
      ) : (
        <ul>
          {filterData.map((transaction) => (
            <li key={transaction._id}>
                <h3>transaction_id:{transaction._id}</h3>
              <p>Status: {transaction.status}</p>
              <p>Type: {transaction.type}</p>
              <p>Amount: {transaction.amount}</p>
              <p>Transaction Date: {new Date(transaction.transactionDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>





    <button onClick={() => setshowUsergetForm(!showUsergetForm)} className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-blue-600"> By User id</button>
      {showUsergetForm && (
        <form onSubmit={handlegetUser}>

          <input
            type="text"
            placeholder="User ID"
            value={user_id}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          <input
            type="date"
            placeholder="From Date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="date"
            placeholder="To Date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Transaction Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300">get</button>
        </form>
      )}
      <div>
      <h2>Transactions</h2>
      {UData.length === 0 ? (
        <p>No transactions available</p>
      ) : (
        <ul>
          {UData.map((transaction) => (
            <li key={transaction._id}>
                <h3>transaction_id:{transaction._id}</h3>
              <p>Status: {transaction.status}</p>
              <p>Type: {transaction.type}</p>
              <p>Amount: {transaction.amount}</p>
              <p>Transaction Date: {new Date(transaction.transactionDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>




     

      <button onClick={viewAll} className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-blue-600">View All Transactions</button>
      <div>
      <h2 className="bg-yellow-500 text-white px-4 py-2 rounded-md transition duration-300">Total Transactions</h2>
      {Vdata.length === 0 ? (
        <p>No transactions available</p>
      ) : (
        <ul>
          {Vdata.map((transaction) => (
            <li key={transaction._id}>
                <h3>transaction_id:{transaction._id}</h3>
              <p>Status: {transaction.status}</p>
              <p>Type: {transaction.type}</p>
              <p>Amount: {transaction.amount}</p>
              <p>UserId: {transaction.userId}</p>
              <p>Transaction Date: {new Date(transaction.transactionDate).toLocaleDateString()}</p>
              <br></br>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
}

export default Home;
