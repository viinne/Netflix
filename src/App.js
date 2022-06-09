import React, { useEffect, useState } from 'react';
import '../src/App.css'
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';


export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    const loadAll = async () => {
      //pegando a lista Total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

     let originals = list.filter(i=>i.slug === 'originals');
     let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
     let chosen = originals[0].items.results[randomChosen];
     let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
     setFeatureData(chosenInfo);

    }
    loadAll();
  }, []);

    useEffect(()=>{
      const scrollListener = () =>{
        if(window.scrollY > 10) {
          setBlackHeader(true);
        } else {
          setBlackHeader(false);
        }
      }

      window.addEventListener('scroll', scrollListener);

      return() => {
        window.removeEventListener('scroll', scrollListener);
      }

    }, []);

  return (
    <div className='page'>

   <Header black={blackHeader}/>

    {featureData &&
     <FeaturedMovie item={featureData}/>
    }
      <section className='lists'>
        {movieList.map((item, key)=> (
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>

      <footer>
      Feito para estudo de react, todos os direitos das imagens são da Netflix.
        Dados Extraidos de https://www.themoviedb.org/
      </footer>
      
      
      {movieList.length <= 0 &&
      <div className="loading">
        <img src="https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="loading"></img>
      </div>
      }

    </div>
  );
}

