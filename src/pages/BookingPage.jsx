import { Spinner } from "@material-tailwind/react"
import { useState } from "react"
import { useEffect } from "react"
import BookingCard from "../components/BookingCard"
import { selectCustomer } from "../supabase/SupabaseData"

const BookingPage = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const getTicket = async () => {
            const { movies, error } = await selectCustomer()
            if (error) throw new Error(error.message)
            else setData(movies)
        // console.log(movies);
            setIsLoading(false)
        }
        getTicket()
    }, [])
    // console.log(data);
    if (isLoading) {
        return (
            <div className="h-screen bg-black flex justify-center items-center">
                <Spinner className="h-16 w-16 text-white" />;
            </div>
        )
    }
    return (
        <section>
            <h1 className="text-center p-5">Your Booking</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8 p-6 mb-8">
                {
                    data.map(i => (
                        <>
                        
                        {/* <h1>{i.movie_type}</h1> */}
                        <BookingCard key={i.id} data={i} />
                        </>
                    ))
                }
            </div>
        </section>
    )
}

export default BookingPage