import React from 'react';
import styled from 'styled-components';

const Switch = () => {
  return (
    <StyledWrapper>
      <div className="container">
        <label className="switch">
          <input type="checkbox" />
          <span className="slider">
            <span className="title">Testimonials</span>
            <span className="ball">
              <span className="icon">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 18V6l8 6-8 6Z" />
                </svg>
              </span>
            </span>
          </span>
        </label>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
    color: #fff;
  }

  .switch {
    font-size: 0.875rem;
    position: relative;
    display: inline-block;
    width: 14em;
    height: 3em;
  }

  .switch input {
    display: none;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .switch input:checked + .slider .ball {
    box-shadow: 10px 10px 100px #7f91a8;
  }

  .switch input:checked + .slider .title {
    left: 40%;
  }

  .switch input:checked + .slider {
    background-color: #8a5cd4;
  }

  .switch input:focus + .slider {
    box-shadow: 10px 10px 100px #7f8996;
  }

  .switch input:checked + .slider .ball {
    left: 72%;
    transform: rotate(360deg);
    box-shadow: none;
    outline: 6px solid rgba(255, 255, 255, 0.278);
  }

  .switch .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #706e75;
    transition: all 0.4s;
    border-radius: 30px;
  }

  .switch .slider .title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 600;
    transition: all 0.4s;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .switch .slider .ball {
    background-color: #fff;
    height: 36px;
    width: 36px;
    border-radius: 50%;
    position: absolute;
    left: -1px;
    transition: 0.4s;
  }

  .switch .slider .ball .icon {
    position: absolute;
    top: 58%;
    left: 53%;
    transform: translate(-50%, -50%);
    color: #313033;
    font-size: 12px;
  }`;

export default Switch;
