import axios from "axios";
import { useState, useEffect } from "react";
import MovieCard from "components/MovieCard";
import Pagination from "components/Pagination";
import { BASE_URL } from "utils/requests";
import { MoviePage } from "types/moviePage";

function Listing (){

    const [page, setPage] = useState<MoviePage>({
        content: [],
        last: true,
        totalPages: 0,
        totalElements: 0,
        size: 12,
        number: 0,
        first: true,
        numberOfElements: 0,
        empty: true
    });

    const [pageNumber, setPageNumber] = useState(0);

    useEffect(() =>{
        axios.get(`${BASE_URL}/movies?size=12&page=${pageNumber}&sort=id`)
        .then(respose =>{
            const data = respose.data as MoviePage;             
            setPage(data);
        });
    }, [pageNumber])

    const handlePageChange = ( newPageNumber : number ) => {
        console.log(newPageNumber);
       setPageNumber(newPageNumber);
    }

    return (
     <>
       <Pagination page={page} onChange={handlePageChange} />
       <div className="container">
            <div className="row">
            {  page.content.map(movie => {                
                return ( 
                 <div key={movie.id} className="col-sm-6 col-lg-4 col-xl-3 mb-3">
                    <MovieCard movie={movie}/>
                </div>)
                })
            }             
            </div>
       </div>
     </>
    );
}

export default Listing;