import './chart.scss';
import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';


export const Chart = ({ aspect, title, last }) => {    

    const Chartdata = (values) => { 
    
        const return_ = []        
        const names = ["Julho","Agosto","Setembro","Outubro","Novembro", "Dezembro"]    
        for (let i=0;i<names.length;i++) {
            let val = (last) ? last[i] : 0
            return_.push({ name: names[i], total: val })
        };
        return return_
    };

    return (
        
        <div className='chart'>
            <div className="title">{title !== undefined ? title : 'Últimos 6 meses'}</div>
            <ResponsiveContainer width="100%" aspect={2 / 0.5}>
                <AreaChart width={730} height={250} data={Chartdata(last)}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="teal" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="teal" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke='gray' />
                    <CartesianGrid strokeDasharray="3 3" className='chartGrid' stroke='gray' />
                    <Tooltip />
                    <Area type="monotone" dataKey="total" stroke="teal" fillOpacity={1} fill="url(#total)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}
