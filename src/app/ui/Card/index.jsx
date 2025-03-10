

export default function Card(input) {
    const title = input.title;
    const text = input.text || 'lorem ipsum';
    const width = input.width;
    const height = input.height;


        return (
            <div id='card-container' className={`w-${width} h-${height} bg-blue m-4 p-4 text-white flex flex-col items-center justify-center`}>
                <h1 className='text-2xl'>{title}</h1>
                <br />
                <p>{text}</p>
            </div>
        );
    }
   
