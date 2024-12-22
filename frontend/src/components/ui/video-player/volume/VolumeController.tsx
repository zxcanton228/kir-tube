import { Volume1, Volume2, VolumeX } from 'lucide-react'
import type { FC } from 'react'

type Props = {
	value: number
	isMuted: boolean
	changeVolume: (value: number) => void
	toggleMute: () => void
}
export const VolumeController: FC<Props> = ({ changeVolume, isMuted, toggleMute, value }) => {
	return (
		<div className='flex items-center gap-1.5'>
			<button
				onClick={toggleMute}
				className='transition-colors hover:text-primary'
			>
				{isMuted ? <VolumeX /> : value < 0.4 ? <Volume1 /> : <Volume2 />}
			</button>
			<input
				type='range'
				min='0'
				max='1'
				step='0.02'
				value={isMuted ? 0 : value}
				onChange={e => changeVolume(parseFloat(e.target.value))}
				className='volume-slider w-12 h-[0.2rem] appearance-none bg-white rounded-lg cursor-pointer transition-all opacity-90 hover:opacity-100'
				style={{
					background: `linear-gradient(to right, white ${value * 100}%, rgba(255, 255, 255, 0.2) ${value * 100}%)`
				}}
			/>
		</div>
	)
}
