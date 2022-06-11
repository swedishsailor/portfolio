import React, { useRef, useState } from 'react'
import './NewProjects.scss'
import Draggable from 'react-draggable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';

interface Project {
  src: string;
  id: number;
  title: string;
  iframe: string;
}
const NewProjects = () => {
  const initialProjects: Project[] = [
    { src: "https://i.postimg.cc/MpCrVwHw/planetraium.png", id: 0, title: 'Planetarium', iframe: "https://swedishsailor.github.io/planetarium/" },
    { src: "https://i.postimg.cc/zvCBj8Sg/franky.png", id: 1, title: 'Franky Cars Warehouse', iframe: "https://swedishsailor.github.io/frankyCars/" },
    { src: "https://i.postimg.cc/3rzMz0xW/pexels-arina-krasnikova-6317441.jpg", id: 2, title: 'Old Portfolio', iframe: "https://swedishsailor.github.io/" }
  ]
  const [restartWindows, setRestartWindows] = useState(false)
  const windowElement: any = useRef(null);
  const minimizedWindowsElement: any = useRef(null)
  const [projects, setProjects] = useState<Project[] | any>(initialProjects);
  const [minimizedWindow, setMinimizedWindows] = useState<Project[]>([])
  const handleClose = (e: any) => {
    // Copy projects arr to new array
    const array = [...projects];
    // Fix the array to remove this window
    array.splice(e.target.id, 1)
    setProjects([
      ...array
    ])
  }
  const handleUnMinimize = (id: any, key: any) => {
    const newItem: any = initialProjects[id];
    // First delete the minimized icon 
    const placeholderArray = [...minimizedWindow]
    placeholderArray.splice(key, 1)
    setMinimizedWindows([
      ...placeholderArray
    ])
    // Then display the window again on the main screen
    setProjects([
      ...projects,
      newItem
    ])
  }
  const handleMinimize = (e: any) => {
    handleClose(e);
    setMinimizedWindows([
      ...minimizedWindow,
      projects[e.target.id]
    ])
  }
  const handleMaximize = () => {
    // On maximize we will create the window on almost whole screen displaying project info
  }

  const changeIndexZToMax = (e: any) => {
    const allWindows: any = document.querySelectorAll('.window')

    // At first change all windows Z Index to 50
    for (const window of allWindows) {
      window.style.zIndex = 50;
    }
    // Then make THIS window Z Index 250
    if (allWindows[e.target.id] !== undefined)
      allWindows[e.target.id].style.zIndex = 250;
  }
  return (
    <div className='NewProjects'>
      {/*<iframe src="https://swedishsailor.github.io/portfolio-game/" className='iproject' title='portfolio game' />*/}
      <h3><FontAwesomeIcon icon={faArrowRotateRight} className="replay" onClick={() => setRestartWindows(true)} />{/*Projects*/}</h3>
      <div className='projectsList' ref={windowElement}>
        { !restartWindows ?
        projects.map((element: any, index: number) => {
          return (
            <Draggable
              axis="both"
              grid={[2, 2]}
              key={index}
              onDrag={(e) => changeIndexZToMax(e)}
            >
              <div className='window' style={{ zIndex: 50 }} id={index.toString()} key={index} onClick={(e) => changeIndexZToMax(e)}>
                <div className='frame'>
                  <div className='topBar' id={index.toString()} onDrag={(e) => changeIndexZToMax(e)} >
                    <div className='Btn closeBtn' id={index.toString()} onClick={(e) => handleClose(e)}>
                    </div>
                    <div className='Btn maxBtn'>
                    </div>
                    <div onClick={(e) => handleMinimize(e)} className='Btn minBtn' id={index.toString()}>
                    </div>
                    <div className='title' onDrag={(e) => changeIndexZToMax(e)}>
                      <p>{element.title}</p>
                    </div>
                  </div>
                </div>
                {/*<img src={element.src} alt="project" />*/}

              </div>
            </Draggable>
          )
        })
        : null}
        { restartWindows ? setTimeout(() =>setRestartWindows(false), 0)  : null}
      </div>
      <div className='tasksBar'>
        <ul className='minimizedWindows' ref={minimizedWindowsElement}>
          {minimizedWindow.map((element: any, index: number) => {
            return (
              <li className='minimizedWindow' id={element.id} onClick={() => handleUnMinimize(element.id, index)} key={index}>
                <img src="https://i.postimg.cc/rp57qS8t/981-9817075-vector-free-what-is-microsoft-explorer-internet-explorer.png" alt="tasks" />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
export default NewProjects