import { Link } from "react-router-dom";
import { TicketCheck } from "lucide-react";

export const TYP = () => {
    return(
<div className="relative min-h-screen bg-[#02040a] text-white flex flex-col justify-center items-center px-6 overflow-hidden">

    {/* Stars */}
    <div className="absolute inset-0 -z-0">
        <div className="absolute top-[10%] left-[15%] w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute top-[20%] left-[80%] w-1.5 h-1.5 bg-white rounded-full"></div>
        <div className="absolute top-[35%] left-[30%] w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute top-[50%] left-[70%] w-2 h-2 bg-white rounded-full"></div>
        <div className="absolute top-[65%] left-[20%] w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute top-[75%] left-[90%] w-1.5 h-1.5 bg-white rounded-full"></div>
        <div className="absolute top-[85%] left-[40%] w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute top-[15%] left-[55%] w-2 h-2 bg-white rounded-full"></div>
        <div className="absolute top-[60%] left-[50%] w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute top-[90%] left-[10%] w-1.5 h-1.5 bg-white rounded-full"></div>
    </div>

    {/* Content */}
    <div className="relative z-10 flex flex-col items-center text-center gap-6">
        <TicketCheck size={100} />

        <h1>
            Thank you, click the button below
            <br />
            to be redirected back to main page
        </h1>

        <Link
            className="bg-white/70 hover:bg-white duration-300 transform text-black py-4 px-6 rounded-2xl"
            to="/"
        >
            Back to Home page
        </Link>
    </div>

</div>
    )
}