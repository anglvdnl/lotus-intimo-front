import React, { useEffect, useState } from 'react'
import styles from './Item.module.scss'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Dot } from 'pure-react-carousel';
import { BsArrowRightShort, BsArrowLeftShort } from 'react-icons/bs'
import { getItemImage } from '../../data/utils/imagesFactory';

function ImageContainer({ id, images }) {
    function createImagePairArray(imageKeys) {
        const someArray = [];

        for (const key of imageKeys) {
            someArray.push({ url: key, image: null, id: id });
        }

        return someArray;
    }

    const [imagePairs, setImagePairs] = useState(createImagePairArray(images));

    if (imagePairs.length > 0 && imagePairs[0].id !== id) {
        setImagePairs(createImagePairArray(images))
    }

    for (let i = 0; i < images.length; i++) {
        const element = images[i]
        if (imagePairs.some((x) => x.url === element && x.image === null)) {
            getItemImage(element, (image) => {
                imagePairs.find(pair => pair.url === element).image = image;
                setImagePairs([...imagePairs]);
            })
        }
    }

    return (
        <CarouselProvider
            step={1}
            dragEnabled={false}
            infinite
            totalSlides={imagePairs.length}
            className={styles.CarouselProvider}
            naturalSlideWidth={400}
            naturalSlideHeight={500}
        >
            <div className={styles.DotsWrapper}>
                {imagePairs.map((imagePair, index) => {
                    return (
                        <Dot key={imagePair + index} className={styles.Dot} slide={index}>
                            <img className={styles.DotImage} src={imagePair.image} />
                        </Dot>
                    )
                })}
            </div>
            <div className={styles.SliderWrapper}>
                <Slider className={styles.Slider}>
                    {imagePairs.map((imagePair, index) => (
                        <Slide index={index} key={index} className={styles.Slide}>
                            <img src={imagePair.image} />
                        </Slide>
                    ))}
                </Slider>
                <ButtonBack className={`${styles.Btn} ${styles.BackBtn}`}><BsArrowLeftShort /></ButtonBack>
                <ButtonNext className={`${styles.Btn} ${styles.NextBtn}`}><BsArrowRightShort /></ButtonNext>
            </div>
        </CarouselProvider>
    )
}

export default ImageContainer