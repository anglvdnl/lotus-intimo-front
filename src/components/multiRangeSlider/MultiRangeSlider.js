import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from "prop-types";
import styles from "./multiRangeSlider.module.scss";
import { shopActions } from '../../core/slices/shopSlice';
import { useDispatch } from 'react-redux'
import { filterTypes } from '../../data/utils/filterTypes';
import { FilterDto } from '../../data/dto/Shop/FilterDto';

function MultiRangeSlider({ min, max }) {

    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef(null);
    const maxValRef = useRef(null);
    const range = useRef(null);

    const dispatch = useDispatch()

    // Convert to percentage
    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(+minValRef.current.value);
            const maxPercent = getPercent(maxVal);

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxVal, getPercent]);

    return (
        <div className={styles.container}>
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                ref={minValRef}
                onChange={(event) => {
                    const value = Math.min(+event.target.value, maxVal - 1);
                    setMinVal(value);
                    event.target.value = value.toString();
                }}
                onMouseUp={(event) => dispatch(shopActions.setFilter(FilterDto(filterTypes.minPrice, Math.min(+event.target.value, maxVal - 1))))}
                className={`${styles.thumb} ${styles.thumbZindex3} ${minVal > max - 100 ? styles.thumbZindex5 : null}`} />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                ref={maxValRef}
                onChange={(event) => {
                    const value = Math.max(+event.target.value, minVal + 1);
                    setMaxVal(value);
                    event.target.value = value.toString();
                }}
                onMouseUp={(event) => dispatch(shopActions.setFilter(FilterDto(filterTypes.maxPrice, Math.max(+event.target.value, minVal + 1))))}
                className={`${styles.thumb} ${styles.thumbZindex4}`}
            />

            <div className={styles.slider}>
                <div className={styles.slider__track} />
                <div ref={range} className={styles.slider__range} />
                <div className={styles.sliderLeftValue}>{minVal}</div>
                <div className={styles.sliderRightValue}>{maxVal}</div>
            </div>
        </div>
    );
};

MultiRangeSlider.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired
};

export default MultiRangeSlider