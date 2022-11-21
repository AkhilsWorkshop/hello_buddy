import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import registerImg from "../../assets/images/user/registerImg.svg"
import { UserAuth } from "../../server/context/AuthContext"
import { BiError } from "react-icons/bi"
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore"
import { db } from "../../server/user/fireBase"

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const { createUser, getCurrentTime } = UserAuth();
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await createUser(email, password);
            await setDoc(doc(db, "users", res.user.uid), {
                userName: name,
                userEmail: email,
                timestamp: getCurrentTime()
            });
            console.log(res)
            navigate("/dashboard")
        } catch (e) {
            e.code === "auth/email-already-in-use" ? setError("Account already exists") : setError("Error Occured! Try Again")

            console.log(e.code);
        }
    };

    return (
        <div className="bg-fourth">
            <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:p-10 mt-20">

                <div className="hidden lg:flex flex-col justify-center items-center gap-7 flex-1 px-20">
                    <p className="text-[2rem] md:text-[2.5rem] font-bold leading-tight">Cancel your subscriptions on time</p>
                    <p className="">By utilizing our app to locate and cancel unwanted subscriptions, 80% of users save money!</p>
                    <div className="flex-1 w-2/3">
                        <img alt="heroImage" src={registerImg} />
                    </div>
                </div>

                <div className="flex flex-col gap-7 w-full lg:w-1/3 bg-[#ffffff] shadow-lg rounded-lg p-10">

                    <div className="flex flex-col gap-2 justify-center items-center">
                        <p className="font-bold text-2xl">Save money now,</p>
                        <p className="text-sm text-center">Create an account to register your subscriptions and start saving!</p>
                    </div>
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium">Your full name</label>
                            <input type="text" id="name" className="shadow-sm bg-fourth text-sm rounded-sm block w-full p-2.5 py-3" placeholder="Tessa Hardin" onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email address</label>
                            <input type="email" id="email" className="shadow-sm bg-fourth text-sm rounded-sm block w-full p-2.5 py-3" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium">Your password</label>
                            <input type="password" id="password" className="shadow-sm bg-fourth text-sm rounded-sm block w-full p-2.5 py-3" onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        {error
                            &&
                            <div className="flex justify-center items-center gap-1 mb-6 border rounded-md text-fourth bg-[#b8352b] py-2">
                                <BiError size={25} />
                                <p className="text-sm">{error}</p>
                            </div>
                        }
                        <button type="submit" className="text-white bg-third/80 hover:bg-third font-medium rounded-lg text-sm px-5 py-2.5 text-center duration-300 flex self-center">Get started </button>
                    </form>
                    <div className="flex gap-2 justify-center items-center">
                        <p className="font-bold text-lg">Already have an account?</p>
                        <Link to="/login" className="text-sm underline">Log In</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register