import { supabase } from "./Client";
const InsertCustomer = async (movieName, userName, movieType, movieSchedule, movieImages) => {
  const { i, error } = await supabase
    .from('movies')
    .insert([
      { movie_name: movieName, username: userName, movie_type: movieType, movie_schedule: movieSchedule, movie_images: movieImages },
    ])
    .select()
  console.log(i);
  return { error }
}

const selectCustomer = async () => {
 
let { data: movies, error } = await supabase
.from('movies')
.select('*')
  return { movies, error }
}

const deleteCustomer = async (id) => {
  const { error } = await supabase
    .from('movies')
    .delete()
    .eq('id', id)
  return { error }

}
export {
  InsertCustomer,
  selectCustomer,
  deleteCustomer
}
