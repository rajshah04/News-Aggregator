import React from 'react'

const Categories = () => {
  return (
    <div>
        <section className="bg-[rgb(0,0,0)] w-full h-[557px]">
            <div className='flex justify-center items-center top-10 relative'>
                <div className='absolute w-5/6 border-[1.5px] border-white rounded-lg'></div>
            </div>

            <h2 className="font-bold text-white text-[64px] pt-20 text-center">
                POPULAR&nbsp;
                <span className="text-blue-700">CATEGORIES</span></h2>

                <div className="flex flex-row justify-center mt-4 gap-10 cursor-pointer">
                    <style>{`
                        .image-container {
                            position: relative;
                            overflow: hidden;
                            transition: transform 0.5s;
                            transform-style: preserve-3d;
                        }
                        .image-container:hover {
                            transform: rotateY(15deg);
                        }
                        .image-container::before {
                            content: '';
                            position: absolute;
                            inset: 0;
                            background: linear-gradient(to top, black, transparent);
                            z-index: 1;
                            border-radius: inherit;
                        }
                        .image-container h4 {
                            position: relative;
                            z-index: 2;
                            transition: color 0.3s;
                        }
                        .image-container:hover h4 {
                            color: #FFFFFF;
                        }
                    `}</style>
                    <div className="border w-[250px] h-[300px] rounded-md hover:shadow-blue-400 shadow-lg bg-cover bg-center bg-no-repeat image-container" style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmbUlM7ZqmITq60v-itQHmnykWVyiUO9uAp3rI8bZRlMADgDX7OYLTr7gg5q95h3theNc&usqp=CAU')" }}>
                        <h4 className="font-[700] text-white text-[24px] mx-10 text-center pt-[250px]">Smartphone</h4>
                    </div>

                    <div className="border w-[250px] h-[300px] rounded-md hover:shadow-blue-400 shadow-lg bg-cover bg-center bg-no-repeat image-container" style={{ backgroundImage: "url('https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/03/technology-trend-freepik-1647963838.jpg')" }}>
                        <h4 className="font-[700] text-white text-[24px] mx-10 text-center pt-[250px]">Technology</h4>
                    </div>
                    <div className="border w-[250px] h-[300px] rounded-md hover:shadow-blue-400 shadow-lg bg-cover bg-center bg-no-repeat image-container" style={{ backgroundImage: "url('https://www.gizmochina.com/wp-content/uploads/2024/06/PS5.webp')" }}>
                        <h4 className="font-[700] text-white text-[24px] mx-10 text-center pt-[250px]">Review</h4>
                    </div>
                    <div className="border w-[250px] h-[300px] rounded-md hover:shadow-blue-400 shadow-lg bg-cover bg-center bg-no-repeat image-container" style={{ backgroundImage: "url('https://i.insider.com/659a6aa8ec62ab5daf81571f?width=700')" }}>
                        <h4 className="font-[700] text-white text-[24px] mx-10 text-center pt-[250px]">IT</h4>
                    </div>
                </div>
        </section>
    </div>
  )
}

export default Categories;