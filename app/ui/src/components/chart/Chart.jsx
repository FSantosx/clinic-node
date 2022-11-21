import './chart.scss';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';


const data = [
    { name: "Junho", total: 700 },
    { name: "Julho", total: 230 },
    { name: "Agosto", total: 400 },
    { name: "Setembro", total: 100 },
    { name: "Outubro", total: 200 },
    { name: "Novembro", total: 200 }
];

export const Chart = () => {
    return (
        <div className='chart'>
            <div className="title">Últimos 6 meses</div>
            <ResponsiveContainer width="100%" aspect={2/1}>
                <AreaChart width={730} height={250} data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke='gray'/>
                    <CartesianGrid strokeDasharray="3 3" className='chartGrid' stroke='gray'/>
                    <Tooltip />
                    <Area type="monotone" dataKey="total" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}
