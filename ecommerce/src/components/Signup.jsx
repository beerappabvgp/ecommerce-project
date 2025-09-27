import { useState } from "react";

export let Signup = () => {
     // create state to store user information and bind it to input fields and pass the data to the server
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [gender, setGender] = useState("")
    const [age, setAge] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [address, setAddress] = useState("")
    const handleSignUp = (e) => {
        e.preventDefault();
        // api call is to http://localhost:3000/api/users/register
        fetch("http://localhost:3000/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // send the state to the server
                name: name,
                email: email,
                password: password,
                gender: gender,
                age: parseInt(age), // Convert to number
                contactNumber: parseInt(contactNumber), // Convert to number
                address: address,
            })
        })
        .then((response) => response.json())
        .then((data) => console.log("data from server: ", data))
        .catch((error) => console.log(error))
    }

    return (
    <div>
        <h1>Signup</h1>
        <form action="">
            <input type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)}/>
            <input type="text" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}/>
            <input type="text" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}/>
            {/* gender, ager, contact number, address */}
            <input type="text" placeholder="Enter Gender" onChange={(e) => setGender(e.target.value)}/>
            <input type="text" placeholder="Enter Age" onChange={(e) => setAge(e.target.value)}/>
            <input type="text" placeholder="Enter Contact Number" onChange={(e) => setContactNumber(e.target.value)} />
            <input type="text" placeholder="Enter Address" onChange={(e) => setAddress(e.target.value)} />

            <button onClick={handleSignUp}>Signup</button>
        </form>
    </div>
    )
}