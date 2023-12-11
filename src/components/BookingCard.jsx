import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { Card } from "react-bootstrap";
import { deleteCustomer } from "../supabase/SupabaseData";
const Booking = ({ data }) => {
  console.log(data);
  const handleCancelBooking = async () => {
    // confirm cancel book
    await Swal.fire({
      title: `Are you sure to Cancel Booking?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { error } = await deleteCustomer(data.id);
        if (!error) {
          await Swal.fire({
            title: "Success!",
            text: `Your booking has been cancelled`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
            timerProgressBar: true,
          });
          window.location.reload();
        } else {
          Swal.fire({
            title: "Error!",
            text: `${error.message}`,
            icon: "error",
            timer: 3000,
            showConfirmButton: false,
          });
        }
      } else {
        Swal.fire({
          title: "Canceled!",
          text: `Your booking is safe!`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };
  return (
    <section className="h-screen">
      <div className="flex flex-wrap justify-center items-center gap-5 p-5">
        <Card className="w-40 h-fit shadow-xl">
          <Card.Img
            variant="top"
            src={data.movie_images}
            className="h-52 object-cover"
          />
          <Card.Body>
            <Card.Title>{data.movie_name}</Card.Title>
            <Card.Text>{data.username}</Card.Text>
            <button
              onClick={handleCancelBooking}
              className="w-full bg-red-800 p-2 rounded-md hover:bg-red-900 transition-all duration-100"
              type="button"
            >
              Cancel Booking
            </button>
          </Card.Body>
        </Card>
      </div>
    </section>
  );
};
Booking.propTypes = {
  data: PropTypes.object
};
export default Booking;

//  <div
//             className="mx-3 mt-6 flex flex-col  rounded-lg shadow-2xl sm:shrink-0 sm:grow sm:basis-0 tew">
//             <a href="#!">
//                 <img
//                     className="rounded-t-lg w-full object-object-fit-cover h-60  "
//                     src={data.image_url}
//                     alt="Skyscrapers" />
//             </a>
//             <div className="p-6">
//                 <h4
//                     className="mb-2 leading-tight text-neutral-800 text-center font-Poppins font-semibold">
//                     {data.anime_title}
//                 </h4>
//                 <div className="flex-col flex w-full">
//                     <div className="flex w-full justify-between">
//                         <p className="mb-4 text-base text-neutral-60">
//                             Customer: {data.customer_name}
//                         </p>
//                         <p className="mb-4 text-base text-neutral-60">
//                             Cinema: VIP{generateCinemaNumber()}
//                         </p>
//                     </div>
//                     <div className="flex w-full justify-between">
//                         <p className="mb-4 text-base text-neutral-60">
//                             Seat: {generateRandomLetter()}{generateRandomNumber()}
//                         </p>
//                         <p className="mb-4 text-base text-neutral-60">
//                             Date: {formatDate(data.date_show)}
//                         </p>
//                     </div>
//                 </div>
//             </div>
//             <div className="p-3 text-white">
//                 {/* button cancel book*/}
//                 <button onClick={handleCancelBooking} className="w-full bg-red-800 p-2 rounded-md hover:bg-red-900 transition-all duration-100" type='button'>
//                     Cancel Booking
//                 </button>
//             </div>
//         </div>
