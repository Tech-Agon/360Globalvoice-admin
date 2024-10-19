import { useTheme } from '../../providers/theme-provider';
import { Moon, SunDim } from 'lucide-react';
import Tooltip from './tooltip';

export function ModeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<div className='font-semibold  '>
			<button
				className=''
				onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
				{theme === 'light' ? (
					<Tooltip
						message='Dark'
						children={
							<p className='flex gap-2'>
								<Moon /> Dark
							</p>
						}
					/>
				) : (
					<Tooltip
						message='Light'
						children={
							<p className='flex gap-2'>
								<SunDim /> Light
							</p>
						}
					/>
				)}
				<></>
			</button>
		</div>
	);
}
