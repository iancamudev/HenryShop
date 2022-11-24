import React, { useEffect, useState  } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { getBestRank } from '../../redux/slices/ProductSlice/productActions';
import { Loading } from '../Loading';

  
function Carrousel(args:any) {
    const bestProducts:any = useAppSelector((state) => state.products.carrouselList);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getBestRank());
    }, [dispatch])
    // State for Active index
    const [currentImg, setCurrentImg] = useState(0);
    const productLength = bestProducts?.length;
    const nextImg = () => {
        setCurrentImg(currentImg === productLength - 1 ? 0 : currentImg + 1);
    };
    const prevImg = () => {
        setCurrentImg(currentImg === 0 ? productLength - 1 : currentImg - 1);
    };
    if(productLength === 0){
        return (
            <Loading/>
        )
    }
    return ( 
        <div className='flex flex-row justify-center items-center '>
            <button onClick={prevImg} className="absolute mr-80	items-center">←</button>
            { bestProducts?.map((e:any, index:any) => {
                    return (
                        <div className="flex flex-row bg-black  justify-center items-center " >{currentImg === index && (
                            <div className="px-5 bg-yellow h-96 w-96 ">
                            <img key={index} src={e.image? e.image: <Loading/>} alt={e.name}  />
                            <p>{e.name}</p>
                            </div>
                        )}
                        
                        </div>
                    )
                })
            }
            <button onClick={nextImg} className="absolute ml-80 items-center"> → </button>
        </div>
    )


}
    
export default Carrousel;