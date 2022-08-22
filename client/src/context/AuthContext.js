import { createContext, useReducer, useEffect } from "react"
import AuthReducer from './AuthReducer'

const INITIAL_STATE = {
    // user: {
    //     _id: "62f7db8c81970c2558febbb3",
    //     username:"snysnoodles",
    //     email:"sny@snoodles.com",
    //     password:"$2b$10$47DHRwg8idmGDEvO03Pd4.UKKJgsL.eQ5T5uIEV5GT7c7oFQ/Hbea",
    //     profilePicture:"person/2.jpeg",
    //     coverPicture:"post/9.jpeg",
    //     followers:Array,
    //     following:["62f5a40d3ae5d3505215eced"],
    //     desc: "this is sny's homepage"
    // },
    // user: {
    //     _id: "62f5a1f3dfd4e103daef6d62",
    //     username: "Yoda",
    //     email:"yod@yod.com",
    //     password:"$2b$10$f1XvRDWzaCNgr0SNd/ec8OC88QgCAhGxOz2NAvQsUTD0tDuRaMoYu",
    //     profilePicture:"person/3.jpeg",
    //     coverPicture: "post/3.jpeg",
    //     followers: [],
    //     following: ["62f5a39c3ae5d3505215ecea", "62f5a40d3ae5d3505215eced", "62f5a4763ae5d3505215ecf0"],
    //     isAdmin:false,
    //     __v: 0,
    //     city:"Boston",
    //     desc: "this is Yoda's's page",
    //     relationship: 2,
    //     img: "post/1.jpeg",
    //     from:"Fresno"
    // },
    // isFetching: false,
    // error: false
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false
    
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    useEffect(()=> {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])

    return (
        <AuthContext.Provider 
        value={{
            user:state.user, 
            isFetching:state.isFetching, 
            error: state.error,
            dispatch,
        }}>
            {children}
        </AuthContext.Provider>
    )
}