import SignUp from "../Features/SignUp";
import Collection from "../Features/Collection";

import SignIn from "../Features/SignIn";

export const Route = [
    {
        path:"/signUp",
        element:<SignUp />
    },
    {
      path: "/book",
      element: <Collection/>
    },
    {
      path: "/login",
      element: <SignIn/>
    }
]
