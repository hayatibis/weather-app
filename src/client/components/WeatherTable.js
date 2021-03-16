import React from 'react'

function WeatherTable( props ) {
  return (
    <>
      <table className="table table-striped table-hover table-bordered">
        <tbody>
          <tr>
            <th scope="row">Wind</th>
            <td>{props.wind}</td>
          </tr>
          <tr>
            <th scope="row">Cloudliness</th>
            <td>{props.cloudliness}</td>
          </tr>
          <tr>
            <th scope="row">Pressure</th>
            <td>{props.pressure}</td>
          </tr>
          <tr>
            <th scope="row">Humidity</th>
            <td>{props.humidity}</td>
          </tr>
          <tr>
            <th scope="row">Sunrise</th>
            <td>{props.sunrise}</td>
          </tr>
          <tr>
            <th scope="row">Sunset</th>
            <td>{props.sunset}</td>
          </tr>
          <tr>
            <th scope="row">Geo coords</th>
            <td>{props.geo_coords}</td>
          </tr>
          
        </tbody>
      </table>
    </>
  )
}

export default WeatherTable
