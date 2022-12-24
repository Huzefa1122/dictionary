import React, { useRef } from 'react'
import { useState, useEffect } from 'react';
import {  BsFillFileWordFill } from 'react-icons/bs'
import { HiSpeakerWave } from 'react-icons/hi2'

function Main() {

    const ref2 = useRef(null)
    const [words, setwords] = useState('')

    let ref1 = useRef(null)
    let onEnterkey = (event) => {

        if (event.key === 'Enter') {
            event.preventDefault();
            setwords(document.getElementById('search').value)
        }
    }

    useEffect(() => {

        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${words}`,)
            .then(response => response.json())
            .then((response) => {
                console.log(response)

                let parsedData = response[0]
                if(parsedData===undefined){
                    document.getElementById('head').innerHTML=response.title;
                    document.getElementById('audio').disabled=true;
                    document.getElementById('partOfSpeech').innerHTML = `This word isn't available.`
                    document.getElementById('pronounciation').innerHTML=``
                    document.getElementById('meaning').innerHTML =`Sorry pal, we couldn't find definitions for the word you were looking for.You can try the search again at later time or head to the web instead`
                }
                else{ document.getElementById('audio').disabled=false;
                

                document.getElementById('meaning').innerHTML = parsedData.meanings[0].definitions[0].definition
                document.getElementById('partOfSpeech').innerHTML = parsedData.meanings[0].partOfSpeech
                console.log(parsedData.meanings[0].partOfSpeech)
                if (parsedData.phonetic === undefined) {
                    let pronounciation=parsedData.phonetics.map(text => {let arr = text.text;console.log(arr);return arr
                    })
                    if(pronounciation.length===0){
                        pronounciation=''
                    }
                    else{pronounciation=`<strong>Pronounciation: </strong>`+pronounciation
                console.log(pronounciation)}
                    document.getElementById('pronounciation').innerHTML = pronounciation
                }
                

                else { document.getElementById('pronounciation').innerHTML =`<strong>Pronounciation: </strong>`+ parsedData.phonetic }}

                



            })
            .catch(err => console.error(err));


    }, [words])

    useEffect(() => {

        if (ref1.current) {
            ref1.current.addEventListener('keydown', onEnterkey)
        }
    })









    let text = words.charAt(0).toUpperCase() + words.slice(1)
    useEffect(() => {
        if (ref2.current)
            ref2.current.addEventListener('click', () => {
                let msg = new SpeechSynthesisUtterance(words)
                msg.lang='en-US'
                speechSynthesis.speak(msg);
                setInterval(
                    speechSynthesis.cancel(), window.speechSynthesis.speak(msg))
            })
    }, [words])

    return (
        <div>

            <div className='container border rounded'>
                <nav className="navbar bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href='/'><BsFillFileWordFill />WORDVERSE</a>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2  rounded-pill" type="search" placeholder="Search the word here" aria-label="Search" id='search' ref={ref1} />
                            <span className="btn btn-outline-dark rounded-pill" id='serbut' onClick={() => { setwords(document.getElementById('search').value) }}  >Search</span>
                        </form>
                    </div>
                </nav> </div>
            <div className=" container my-4 rounded card text-center">
                <div className="card-header" id='title'>
                    <h1 id='head'>{text === '' ? 'Search the word' : text}</h1>
                </div>
                <div className="card-body">

                    <div className='text-start my-3' id='audioremover'><strong>Pronounciation-US: </strong><button  className='btn' id='audio' ref={ref2} style={{ fontSize: '20px', background: '#d2d6d3', borderRadius: '70px', textAlign: 'center' }}>

                        <HiSpeakerWave style={{ marginBottom: '5px' }} />
                    </button></div>
                    <div className='text-start my-3'><span id='pronounciation'><strong>Pronounciation:</strong>Pronounciation of the word will be displayed here</span></div>
                    <div className='text-start my-3'> <strong>Meaning: </strong> <span id='meaning'>Meaning of the word will be displayed here</span></div>

                    <div className='text-start my-3'> <strong>Part of speech: </strong> <span id='partOfSpeech'>Meaning of the word will be displayed here</span></div>
                </div>

            </div>

        </div>
    )
}

export default Main