import { useUserContext } from '@/contexts/UserContext'
import { usePointContext } from '@/contexts/PointContext'

const DemoUser = () => {
    const { account, setAccount } = useUserContext()
    const { point, setPoint } = usePointContext()
    return (
        <div>
            <div className='text-white flex flex-col'>
                <div>
                    <div>user</div>
                    <div>id: {account?.id}</div>
                    <div>tg_id: {account?.telegram_info.telegram_id}</div>
                </div>
                <div>
                    <div>point</div>
                    <div>id: {point?.id}</div>
                    <div>amount: {point?.amount}</div>
                    <div>extra_profit_per_hour: {point?.extra_profit_per_hour}</div>
                </div>
            </div>
        </div>
    )
}

export default DemoUser