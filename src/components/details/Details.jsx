import { useEffect, useState } from 'react'
import { Badge, Button, Col, Container, Image, Row } from 'react-bootstrap'
import { ScrollMenu } from 'react-horizontal-scrolling-menu'
import { useDispatch } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { setColorAction } from '../../store/background'
import { addToHistory } from '../../storeAsyncActions/account'
import { getMovieCast, getMovieDetails, getVideos } from '../../storeAsyncActions/movies'
import { largeImageStyle, notFoundUrl } from '../../variables'
import CastCard from './cast/castCard/CastCard'
import FavButton from './favButton/FavButton'
import VideoModal from './modal/VideoModal'
import TVData from './tvData/TVData'

const Details = (props) => {

  const params = useParams();
  const movieId = params.id
  const mediaType = params.type

  const [movieData, setMovieData] = useState({})
  const [cast, setCast] = useState([])
  const [modalShow, setModalShow] = useState(false)
  const [videos, setVideos] = useState([])

  useEffect(() => {
    if (movieId) {
      getMovieDetails(movieId, mediaType).then(res => {
        setMovieData(res)
        addToHistory(res)
      })
    }
  }, [props])

  useEffect(() => {
    if (movieData.id !== undefined) {
      getVideos(movieData).then(res => {
        setVideos(res.results)
      })
    }
  }, [movieData])

  useEffect(() => {
    getMovieCast(movieId, mediaType).then(res => {
      setCast(res)
    })
  }, [props])

  const date = new Date(movieData.release_date ? movieData.release_date : movieData.first_air_date)
  const genres = movieData.genres?.map((el, index) => {
    return <NavLink key={index}
      style={{ color: 'white !important' }}
      to={{ pathname: el.name }}>{el.name}{index === movieData.genres.length - 1 ? '' : ', '}</NavLink>
  })

  return (
    <div className="containers bg-dark" style={{ zIndex: 1 }} >
      <style>
        {`.containers {
            position: relative;
            //color: rgb(48, 45, 45);
            /*Note, you can change the color to your choice depending on your 
            image and what color blends with it*/
            color:white;
          }

          .containers::after {
            content: "";
            background-color: #cccccc;
            background: linear-gradient( rgba(222, 222, 222, 0.5), rgba(0, 0, 0, 1) ), url("https://image.tmdb.org/t/p/original${movieData.backdrop_path}") no-repeat fixed top;
            //background-blend-mode: luminosity;
            /* also change the blend mode to what suits you, from darken, to other 
            many options as you deem fit*/
            background-size: cover;
            top: 0;
            left: 0;
            right: 0;
            //filter: blur(4px);
            bottom: 0;
            position: absolute;
            z-index: -1;
            height: 100%;
          }`}
      </style>
      <Container className=' p-2' fluid={true} xl={10} lg={10} md={10} sm={10} xs={10} >
        <VideoModal
          state={movieData}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <Row className="g-0">
          <Col lg={2}  >
            {movieData.backdrop_path === undefined || movieData.backdrop_path === null ?
              <Image style={largeImageStyle} fluid={true} src={notFoundUrl.movieLargePoster} rounded />
              :
              <Image fluid={true} src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`} rounded />
            }
          </Col>
          <Col className='m-2' lg={8}  >
            <Row className="g-0"  >
              <h1>
                {movieData.title ? movieData.title : movieData.original_name} {`(${date.getFullYear()})`}
              </h1>
              <div className="font-italic">{movieData.tagline}</div>
            </Row>
            <Row className="g-0" xs="auto">
              <Col><Badge bg="dark">{genres}</Badge></Col>
              <Col><Badge bg="dark">{movieData?.runtime ?
                movieData?.runtime
                :
                movieData?.episode_run_time ? movieData?.episode_run_time[0] : ''}m</Badge></Col>
            </Row>
            {movieData.overview}
            <Row className="g-0" xs="auto">
              {videos.length > 0 ?
                <Button variant="danger" onClick={() => setModalShow(true)}>
                  Watch trailer
                </Button>
                :
                <Button className="disabled" variant="danger" onClick={() => setModalShow(true)}>
                  There are no trailers
                </Button>
              }
            </Row>
            <Row className="g-0" xs="auto">
              <FavButton state={movieData} />
            </Row>
          </Col>
        </Row>
        {mediaType === 'tv' ?
          <Row className="g-0">
            <TVData state={movieData} />
          </Row>
          :
          <></>
        }
        Cast
        <Row className="g-0" >
          <ScrollMenu>
            {cast.map(el => {
              return <CastCard state={el} key={el.id} />
            })}
          </ScrollMenu>
        </Row>
      </Container >
    </div>
  )
}

export default Details