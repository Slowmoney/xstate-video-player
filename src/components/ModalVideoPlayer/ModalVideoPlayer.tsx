import { Button, Modal } from 'antd';
import { FullscreenExitOutlined, PlaySquareOutlined, PauseCircleOutlined, FullscreenOutlined, PlayCircleOutlined } from '@ant-design/icons'
import ReactPlayer from 'react-player'
import { useMachine } from '@xstate/react';
import { machine } from './VideoPlayerMachine';
import './ModalVideoPlayer.css';

declare module 'antd'{
    export interface ModalProps{
        children: JSX.Element
    }
}

export function ModalVideoPlayer () {
    const [state, send] = useMachine(machine);
    const isOpen = state.matches('opened')
    const isMinimize = state.matches('opened.size.mini')
    const isPlaying = state.matches('opened.control.played')

    return (<>
        <div className='modal-video-player'>
            <Button onClick={() => send('OPEN')} type="primary" shape="circle" icon={<PlaySquareOutlined />} />
        </div>
        <Modal onCancel={() => send('CLOSE')}  title="Video" visible={isOpen} footer={<>
            <Button onClick={() => send('TOGGLE')} type="primary" shape="circle" icon={isMinimize?<FullscreenOutlined />:<FullscreenExitOutlined />} />
            <Button onClick={()=>send(isPlaying?'PAUSE':'PLAY')} type="primary" shape="circle" icon={isPlaying?<PauseCircleOutlined />:<PlayCircleOutlined />} />
        </>} width={isMinimize?640:1200}>
            <div>
                <ReactPlayer
                    style={{ maxWidth: '100%' }}
                    width={'100%'}
                    height={'auto'}
                    playing={isPlaying}
                    url='https://cdn.flowplayer.com/d9cd469f-14fc-4b7b-a7f6-ccbfa755dcb8/hls/383f752a-cbd1-4691-a73f-a4e583391b3d/playlist.m3u8'
                />
                <div></div>
            </div>
        </Modal></>)
}