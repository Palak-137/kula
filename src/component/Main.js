import React, {useMemo, useRef, useState, useEffect } from 'react'
import sample1 from "../static/63413ff244f1dc616b7148a0_Mco-transcode.mp4"
import sample2 from "../static/63455a67996ba248148c4e31_add-options (3)-transcode.mp4"
import Video from './video'
import sample3 from "../static/6341303c29c5340961dc9ae6_Mco-1-transcode.mp4"
import "./style.css"
import axios from 'axios'


function useIsInViewport(ref) {
  const [isIntersecting, setIsIntersecting] = useState(false);
    const observer = useMemo(
      () =>
        new IntersectionObserver(([entry]) =>
          setIsIntersecting(entry.isIntersecting),
        ),
      [],
    );
  
    useEffect(() => {
      observer.observe(ref.current);
  
      return () => {
        observer.disconnect();
      };
    }, [ref, observer]);
  
    return isIntersecting;
}
  

function Main() {
    const [state, setState] = useState(sample1);
  const [data, setData] = useState({});
  
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);

  const isInViewport1 = useIsInViewport(ref1);
  console.log('isInViewport1: ', isInViewport1);

  const isInViewport2 = useIsInViewport(ref2);
    console.log('isInViewport2: ', isInViewport2);

    const isInViewport3 = useIsInViewport(ref3);
    console.log('isInViewport3: ', isInViewport3);
    
    const fetchJson = () => {
      axios.get("https://mocki.io/v1/ee762599-31ae-4a3d-a6c7-d596525945e1", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
        .then(({ data }) => {
          setData(data);
   // console.log("reuest data ",data);
});
  }
 
  
    useEffect(() => {
   
    if (isInViewport1 === true && isInViewport2 === false && isInViewport3 === false ) {
      setState(sample1);
    }
    if (isInViewport1 === true && isInViewport2 === true && isInViewport3 === false) { 
        setState(sample2);
    }
    if (isInViewport1 === false && isInViewport2 === true && isInViewport3 === true) {
      setState(sample3);
    }
        //console.log(state);
    
      //fetching the data from api  
      fetchJson();
      console.log("data in main ", data)
    
      
  }, [isInViewport1,isInViewport2,isInViewport3]);

    //console.log("sample in main ", state)
  return (
      <>
          <div className='row'>
            <div className='col'>
            <div className='row one-quote'>
            <div className='col'>
              <div ref={ref1} className="left-sidebox">
                <div>
                  <h2 className='small-heading'>{(data.texts !== undefined && data!== "" && data!==null) ? data.texts[0].subHeading:"Sub Heading" }</h2>
                  <h1 className='heading9'>{(data.texts !== undefined && data!== "" && data!==null)  ? data.texts[0].heading : "Sub Heading"}</h1>
                  <p className='text-size-medium-2'>{(data.texts !== undefined && data!== "" && data!==null)  ? data.texts[0].description : "Sub Heading"}</p>
                </div>
                      
              </div>
              <div className='col'>
              <div className='mobile-view'>
            <Video sample={sample1}/>
                  </div>
              </div>
            </div>
          </div>
            <div className='row one-quote'>
            <div className='col'>
            <div ref={ref2} className="left-sidebox">
            <div>
              <h4 className='small-heading'>{  (data.texts !== undefined && data!== "" && data!==null) ? data.texts[1].subHeading:"Sub Heading" }</h4>
                    <h1 className='heading9'>{(data.texts !== undefined && data!== "" && data!==null) ? data.texts[1].heading : "Sub Heading"}</h1>
                    <p className='text-size-medium-2'>{(data.texts !== undefined && data!== "" && data!==null) ? data.texts[1].description : "Sub Heading"}</p>
                  </div>
              </div>
              <div className='col'>
              <div className='mobile-view'>
              <Video sample={sample2}/>
                  </div>
              </div>
            </div>
          </div>
          <div className='row one-quote'>
            <div className='col'>
            <div ref={ref3} className="left-sidebox">
            <div>
            <h4 className='small-heading'>{  (data.texts !== undefined && data!== "" && data!==null) ? data.texts[2].subHeading:"Sub Heading" }</h4>
                  <h1 className='heading9'>{(data.texts !== undefined && data!== "" && data!==null) ? data.texts[2].heading : "Sub Heading"}</h1>
                  <p className='text-size-medium-2'>{(data.texts !== undefined && data!== "" && data!==null) ? data.texts[2].description : "Sub Heading"}</p>
                </div>
              </div>
              <div className='col'>
              <div className='mobile-view'>
            <Video sample={sample3}/>
                  </div>
              </div>
            </div>
          </div>
                
              </div>
              <div className='col videoDiv '>
              <Video sample={state}/>
          </div>
          </div>
          </>
  )
}

export default Main