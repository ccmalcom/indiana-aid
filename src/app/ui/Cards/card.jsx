

export default function Card(input) {
    const title = input.title;
        return (
            <div id='card-container' className="w-1/3 h-1/3 bg-gray-200 m-4 p-4">
                <h1>Card {title}</h1>
            </div>
        );
    }
   
