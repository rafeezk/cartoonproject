import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Card } from "react-bootstrap";
import InputComponent from "../components/InputComponent";
import useInput from "../hooks/useInput";
import { Pagination } from "@mui/material";
import Swal from "sweetalert2";
import { InsertCustomer } from "../supabase/SupabaseData";
import { Spinner } from "@material-tailwind/react";
import Search from "../components/Search";

const MoviePage = () => {
  // const [data, setData] = useState([]);
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const today = new Date().toLocaleDateString("en-CA", options);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [show, setShow] = useState(false);
  const [username, handleUsername] = useInput("");
  const [type, handleType] = useInput("Regular");
  const [schedule, handleShedule] = useInput(today);
  const [isLoading, setLoading] = useState(false);
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const handlePagination = async (ev, value) => {
    setPage(value);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}&page=${page}&limit=24&q=${search}`
      );
      console.log(search);
      setLoading(true);
      if (res.data.data && res.data.pagination) {
        setMovie(res.data.data);
        setPage(res.data.pagination.current_page);
        setTotalPages(res.data.pagination.last_visible_page);
      }
      setLoading(false);
    };
    getData();
  }, [page, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!username || !type || !schedule) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the fields and select a movie for booking!",
      });
      setLoading(false);
      return;
    }
    // console.log(selectedMovie.title, username, type, schedule);
    const { error } = await InsertCustomer(
      selectedMovie.title,
      username,
      type,
      schedule,
      selectedMovie.images.jpg.image_url
    );
    if (!error) {
      setLoading(false);
      handleClose();
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Successfully added ${selectedMovie.title} to your list`,
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      setLoading(false);
      handleClose();
      alert(`Error: ${error}`);
    }
  };

  const handleBooking = (selectedMovie) => {
    setSelectedMovie(selectedMovie);
    handleShow();
  };

  const addDays = (date, numDays) => {
    const add = new Date().setDate(new Date(date).getDate() + numDays);
    return new Date(add).toLocaleDateString("en-CA");
  };

  function truncate(str) {
    return str.length > 80 ? str.substring(0, 80) + "..." : str;
  }

  const querySearch = (e) => {
    e.preventDefault()
    setSearch(query);
  };

  return (
    <>
      <section className="movie" id="movie">
        <div className="max-w-md mx-auto p-5">
          <Search setQuery={setQuery} query={query} querySearch={querySearch} />
        </div>
        <div className="flex flex-wrap justify-center items-center gap-5 p-5">
          {movie.map((i) => (
            <Card key={i.mal_id} movie={i} className="w-96 h-fit shadow-xl">
              <Card.Img
                variant="top"
                src={i.images.jpg.large_image_url}
                className="h-52 object-cover"
              />
              <Card.Body>
                <Card.Title className="font-semibold">{i.title}</Card.Title>
                {i.synopsis !== undefined && i.synopsis !== null && (
                  <Card.Text>{truncate(i.synopsis)}</Card.Text>
                )}
                <Card.Text>rating: ⭐{i.score}</Card.Text>

                <Button
                  variant="light"
                  className="w-full text-black"
                  onClick={() => handleBooking(i)}
                >
                  Booking Now
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Booking Form</Modal.Title>
                  </Modal.Header>
                  <form onSubmit={handleSubmit}>
                    <Modal.Body className="space-y-2 md:space-y-2">
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5"
                        type="text"
                        value={selectedMovie && selectedMovie.title}
                        disabled
                      />
                      <InputComponent
                        type="text"
                        id="username"
                        isTitle={false}
                        placeholder="Customer Name"
                        value={username}
                        valueHandler={handleUsername}
                      />
                      <div className="flex flex-col py-3 w-full gap-3">
                        <h5>Type</h5>
                        <div className="flex justify-center gap-4">
                          <div className="flex gap-2 justify-center items-center">
                            <input
                              type="radio"
                              name="type"
                              id="regular"
                              checked={type === "Regular"}
                              value="Regular"
                              onChange={handleType}
                            />
                            <label
                              className="font-medium text-blue-gray-700"
                              htmlFor="regular"
                            >
                              Regular
                            </label>
                          </div>
                          <div className="flex gap-2 justify-center items-center">
                            <input
                              type="radio"
                              name="type"
                              id="VIP"
                              checked={type === "VIP"}
                              value="VIP"
                              onChange={handleType}
                            />
                            <label
                              className="font-medium text-blue-gray-700"
                              htmlFor="VIP"
                            >
                              VIP
                            </label>
                          </div>
                          <div className="flex gap-2 justify-center items-center">
                            <input
                              type="radio"
                              name="type"
                              id="Premium"
                              checked={type === "Premium"}
                              value="Premium"
                              onChange={handleType}
                            />
                            <label
                              className="font-medium text-blue-gray-700"
                              htmlFor="Premium"
                            >
                              Premium
                            </label>
                          </div>
                        </div>
                      </div>
                      <InputComponent
                        id="dateSchedule"
                        isTitle
                        type="date"
                        value={schedule}
                        valueHandler={handleShedule}
                        titleInput="Select Date"
                        minValue={today}
                        maxValue={addDays(today, 7)}
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      {isLoading ? (
                        <Button variant="secondary" disabled>
                          Close
                        </Button>
                      ) : (
                        <Button variant="secondary">Close</Button>
                      )}
                      {isLoading ? (
                        <Button variant="primary" disabled>
                          Loading...
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        </Button>
                      ) : (
                        <Button type="submit" variant="primary">
                          Book Now
                        </Button>
                      )}
                    </Modal.Footer>
                  </form>
                </Modal>
              </Card.Body>
            </Card>
          ))}
        </div>

        <div className="flex justify-center py-6">
          <Pagination
            color="primary"
            className="text-white"
            count={totalPages}
            page={page}
            onChange={handlePagination}
          />
        </div>
      </section>
    </>
  );
};

export default MoviePage;
