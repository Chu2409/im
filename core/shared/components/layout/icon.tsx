// components/IconComponent.js

import React from 'react'

export const IconSvg: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    x='0px'
    y='0px'
    width='110px'
    height='110px'
    viewBox='0 0 110 110'
    style={{}}
    fill='currentColor'
    xmlSpace='preserve'
    {...props} // Permite pasar propiedades como `width`, `height`, etc.
  >
    <g id='Artboard' />
    <g id='Multicolor'>
      <circle style={{ fill: '#32BEA6' }} cx='55' cy='55' r='55' />
      <g>
        <g>
          <path
            style={{ fill: '#3E3E3F' }}
            d='M35,61c0,1.105,0.895,2,2,2h30v-4H37C35.895,59,35,59.895,35,61z'
          />
        </g>
        <g>
          <path
            style={{ fill: '#E2E4E5' }}
            d='M85,79h-2l-7.328-10.517c3.262-2.146,5.713-5.289,7.056-9.216
          c2.61-7.631,0.524-16.718-5.189-22.611C72.831,31.8,66.26,29.69,59,30.56V27H47v24h12V39.648
          c4.96-0.903,9.101,0.203,12.077,3.273c3.364,3.471,4.653,8.995,3.135,13.435c-0.545,1.594-1.615,3.45-3.687,4.741l-0.339-0.487
          C69.44,59.598,68.258,59,67,59s-2.44,0.598-3.187,1.61L51,79H29c-1.104,0-2,0.896-2,2v4c0,1.104,0.896,2,2,2h56
          c1.104,0,2-0.896,2-2v-4C87,79.896,86.104,79,85,79z'
          />
        </g>
        <g>
          <rect
            x='50'
            y='24'
            style={{ fill: '#3E3E3F' }}
            width='6'
            height='3'
          />
        </g>
        <g>
          <rect
            x='49'
            y='51'
            style={{ fill: '#3E3E3F' }}
            width='8'
            height='4'
          />
        </g>
        <path
          style={{ fill: '#F0F1F1' }}
          d='M75.672,68.483c3.262-2.146,5.713-5.289,7.056-9.216c2.61-7.631,0.524-16.718-5.189-22.611
        C72.831,31.8,66.26,29.69,59,30.56v9.088c4.96-0.903,9.102,0.203,12.077,3.272c3.364,3.471,4.653,8.995,3.135,13.435
        c-0.545,1.595-1.615,3.45-3.687,4.741l-0.339-0.486C69.44,59.598,68.258,59,67,59s-2.44,0.598-3.187,1.61L51,79h32L75.672,68.483z'
        />
        <g>
          <path
            style={{ fill: '#FFFFFF' }}
            d='M70.187,60.61C69.44,59.598,68.258,59,67,59s-2.44,0.598-3.187,1.61L51,79h8.892l13.619-13.619
            L70.187,60.61z'
          />
        </g>
        <g>
          <rect
            x='49'
            y='51'
            style={{ fill: '#5B5C5F' }}
            width='4'
            height='4'
          />
        </g>
        <g>
          <rect
            x='50'
            y='24'
            style={{ fill: '#5B5C5F' }}
            width='3'
            height='3'
          />
        </g>
        <g>
          <rect
            x='47'
            y='27'
            style={{ fill: '#FFFFFF' }}
            width='6'
            height='24'
          />
        </g>
        <g>
          <circle style={{ fill: '#5B5C5F' }} cx='67' cy='65' r='2' />
        </g>
      </g>
    </g>
  </svg>
)
