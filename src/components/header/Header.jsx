import React from 'react';
import TopMenu from './TopMenu';

export default function Header(props){
    return(
       <>
            <TopMenu organization={props.organization}/>
       </>
    )
}