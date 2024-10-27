

import { Quote } from "../components/Quote"
import { Auth } from "../components/Auth"

export const Signin = () => {
    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <Auth type="signin"/>
            </div>
            <div className="block lg:none">
                <Quote />
            </div> 
        </div>      
    </div>
}  