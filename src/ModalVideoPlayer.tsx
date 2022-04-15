import { Button, Modal } from 'antd';
import { FullscreenExitOutlined, PauseCircleOutlined } from '@ant-design/icons'
import ReactPlayer from 'react-player'
import { useMachine } from '@xstate/react';
import { createMachine } from 'xstate';

const toggleMachine = createMachine({
    id: 'toggle',
    initial: 'closed',
    states: {
        mini: {
            on: { TOGGLE: 'full', CLOSE: 'closed' }
        },
        full: {
            on: { TOGGLE: 'mini', CLOSE: 'closed' }
        },
        closed: {
            on: { OPEN: 'mini' }
        }
    }
});

export function ModalVideoPlayer () {
    const [state, send] = useMachine(toggleMachine);
    console.log(state.value);

    return (<>
        <Button onClick={() => send('OPEN')} type="secondary" shape="circle" icon={<PauseCircleOutlined />} />
        <Modal onCancel={() => send('CLOSE')} title="Video" visible={state.value !== 'closed'} footer={<>
            <Button onClick={() => send('TOGGLE')} type="primary" shape="circle" icon={<FullscreenExitOutlined />} />
            <Button type="secondary" shape="circle" icon={<PauseCircleOutlined />} />
        </>}>
            <div>
                <ReactPlayer
                    style={{ maxWidth: '100%' }}
                    height={'auto'}
                    playing={true}
                    controls={true}
                    url='https://cdn.flowplayer.com/d9cd469f-14fc-4b7b-a7f6-ccbfa755dcb8/hls/383f752a-cbd1-4691-a73f-a4e583391b3d/playlist.m3u8'
                />
                <div></div>
            </div>
        </Modal></>)
}