import { TitleComponentProps } from '../../type'
import GolfinIconText from '../../assets/images/02_earn_logo.png'
import './Title.css'
const Title = ({ titlename, style }: TitleComponentProps) => {
    return (
        <div>
            <div className='screen-title-container'>
                <div className='screen-base-title'>
                    <img src={GolfinIconText} width="270px" className='mx-auto' />
                </div>
                <div className='screen-title' style={style}>
                    <div className='justify-center'>
                        <div className='screen-title-text'>{titlename}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Title