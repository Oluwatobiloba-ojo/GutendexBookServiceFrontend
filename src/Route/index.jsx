import SignUp from "../Features/SignUp";
import Collection from "../Features/Collection";

export const Route = [
    {
        path:"/signUp",
        element:<SignUp />
    },
    {
      path: "/book",
      element: <Collection/>
    },
]
