
import React, {useEffect} from "react";

// Swiper 8
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, NavLink } from 'react-router-dom';

// Swiper v9 
// import Swiper, {SwiperOptions} from "swiper";
// import { register } from 'swiper/element/bundle';



// import required modules
// import { EffectCreative } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination"
// import "swiper/css/effect-creative";

// import Swiper core and required modules
import SwiperCore, {
  Pagination,
  Autoplay
} from 'swiper';

// install Swiper modules
SwiperCore.use([Autoplay,Pagination]);



export default function Banner(props) {
  const slides = props.covers ?? {};

  // Siper v9
  // useEffect(async () => {
  //   register();
  //   const swiper = new Swiper('.swiper', {
  //     loop: true,
  //     initialSlide: 0,
  //     speed: 500,
  //     pagination: {
  //       clickable: true
  //     },
  //     autoplay: {
  //       delay: 3000,
  //       disableOnInteraction: false,
  //     },
  //     on: {
  //       init: function () {
  //         console.log('Swiper: [init]');
  //       },
  //       activeIndexChange: function (param) {
  //         console.log(`Swiper: [activeIndexChange] activeIndex=${swiper.activeIndex} realIndex=${swiper.realIndex}`);
  //       },
  //       realIndexChange: function (param) {
  //         console.log(`Swiper: [realIndexChange] activeIndex=${swiper.activeIndex} realIndex=${swiper.realIndex}`);
  //       },
  //       slideChange: function () {
  //         console.log(`Swiper: [slideChange] activeIndex=${swiper.activeIndex} realIndex=${swiper.realIndex}`);
  //       }
  //     },
  //   });
  // }, []);

  const content = (e) => {
    if(e.target.hasOwnProperty('content')){
      return e.target.content
    }
  }

  const button = (e) => {
    if(e.target.hasOwnProperty('caption')){
      const b = (<button type="button" className="subscribe_button flat_button">{e.target?.caption}</button>);
      const m = e.target?.link.startsWith('http');
      if (m) {
        return (<a href={e.target?.link}>{b}</a>);
      } else {
        return (<NavLink to={{pathname: e.target?.link}} className="">{b}</NavLink>);
      }
    }
  }

  function slideChange (swiper) {
    // console.log('slideChange => ', swiper.realIndex, ' - ', swiper.previousIndex);
  }
  
  function slideChangeTransitionEnd	(swiper) {
    // console.log('slideChangeTransitionEnd => ', swiper.realIndex, ' - ', swiper.previousIndex);

    // var slides22 = document.getElementsByClassName('swiper-slide');
    // console.log({length: slides22.length});
    
    // for(let slide of slides22) {
    //   slide.classList.remove('animator');
    // }

    // var [activated] = document.getElementsByClassName('swiper-slide swiper-slide-active');
    // console.log({activated});
    // activated.classList.add('animator');
  }

  function slideChangeTransitionStart (swiper) {
    // console.log('slideChangeTransitionStart => ', swiper.realIndex, ' - ', swiper.previousIndex);
  }

  return (
    <>
      {/* <swiper-container class="swiper">
        {
          props.covers?.map((e, index) => {
            return (<swiper-slide class="swiper-slide" key={index} style={{display: 'flex', backgroundImage: `url("${e.url}")`, ...e.options.css}}>
              <div class="text-content">
                <div dangerouslySetInnerHTML={{__html: content(e)}}></div>
                {button(e)}
              </div>
            </swiper-slide>)
          })
        }
      </swiper-container> */}


      <Swiper
        onSlideChange={slideChange}
        onSlideChangeTransitionStart={slideChangeTransitionStart}
        onSlideChangeTransitionEnd={slideChangeTransitionEnd}
        pagination={{"clickable": true}}
        autoplay={{"delay": 7000,"disableOnInteraction": false}}
        speed={500}
        loop={true}
        className="mySwiper"
        initialSlide={0}
        id="swiper"
        // grabCursor={true}
        // effect={"creative"}
        // creativeEffect={{
        //   prev: {
        //     shadow: true,
        //     translate: [0, 0, -400],
        //   },
        //   next: {
        //     translate: ["100%", 0, 0],
        //   },
        // }}
        // modules={[EffectCreative]}
      >
        {
          props.covers?.map((e, index) => {
            return (<SwiperSlide key={index} style={{display: 'flex', backgroundImage: `url("${e.url}")`, ...e.options.css}}>
              <div style={{flexGrow: '1'}}></div> 
              <div class="text-content">
                <div dangerouslySetInnerHTML={{__html: content(e)}}></div>
                {button(e)}
              </div>
              <div style={{flexGrow: '1'}}></div>
            </SwiperSlide>)
          })
        }
      </Swiper>
    </>
  );
}