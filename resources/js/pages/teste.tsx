import { env } from 'process';
import { useEffect, useState } from 'react';

const PlaceSearch = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("Pizzarias em São Paulo");

  const handleSearch = async () => {
    // 1. Importa a biblioteca de Lugares dinamicamente
    const { Place } = await window.google.maps.importLibrary("places");

    const request = {
      textQuery: query,
      fields: ["displayName", "formattedAddress", "location"],
      isOpenNow: false,
    };

    const { places } = await Place.searchByText(request);

    if (places.length) {
      setResults(places);
      console.log(places);
    } else {
      console.log("Nenhum resultado encontrado.");
    }
  };

  useEffect(() => {
    (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
      key: import.meta.env.VITE_API_GOOGLE_KEY,
      v: "weekly",
    });
  }, []);

    const handleSearchAPI = async () => {
        try {
            const placeId = results[0].id;
            const apiKey = import.meta.env.VITE_API_GOOGLE_KEY;

            const url = `https://places.googleapis.com/v1/places/${placeId}?key=${apiKey}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // OBRIGATÓRIO: Escolha os campos ou use '*' para todos (mais caro)
                    'X-Goog-FieldMask': '*'
                }
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error fetching place details:', error);
        }
    };

  return (
    <div>
        <h1>TESTE DO TEXTSEARCH</h1>
        <input type="text" className='bg-gray-300 px-4 py-2 text-black' onChange={(e) => setQuery(e.target.value)} />
      <button className='bg-white text-black px-4 py-2' onClick={handleSearch}>Buscar</button>
      <button className='bg-white text-black px-4 py-2' onClick={handleSearchAPI}>Buscar na API do Places</button>
      <ul>
        {results.map((place) => (
          <li key={place.id}>
            ID: {place.id} - <strong>{place.displayName}</strong> - {place.formattedAddress}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaceSearch;
