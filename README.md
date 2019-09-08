## Project Description
This project attempts to display transit directions between two locations with information about temperature deviation due to heat island and green cover over the route.
Access the portal at http://smartpaths.govhack.thaum.io:3000/gmap
Select a map from the menu on the right to view.

## Question
_Going from A to B in a city is shouldn't just about speed. It should be about safety, comfort and enjoyment. Can we help individuals choose how they navigate a city based on these factors? Further, can we help city planning authorities to estimate which public spaces need attention?_

## Solution
Our solution comes in two parts: a React frontend application for displaying map visualisations, and a backend Python API service for data retrieval and developers. 

Given a mode of transport, our app provides you with human centric data about possible routes between your location and another. In particular, it measures the urban heat and greenery coverage and provides a selection of the best routes. Empowering you to make informed pathing decisions.

The datasets Urban Heat & Green Cover dataset(s) from the SEED portal provide heat deviation and amount of green cover. Combining this georeferenced data with Google Maps APIs, we integrated routing information to quantify the amount of heat deviation and vegetation cover that can be experienced along a route.

Displaying the metrics for a route and also providing a rich visualisation and interactive display options for the data can help provide members of the public with a better understanding and options of possible routes.

Since our solution makes it very easy for integration with other arbitrary datasets with geographic position information, other open datasets — such as the Canberra’s street light location dataset — can be included to provide further options for route customisation. For example, this data could be used for determining a well lit route for commuting safety at night.
The API enables quick and easy querying of the joined Government and Maps datasets. Further, the queries made by users can be anonymised and stored by the backend. This provides a live feed of locations in the city that are in need of attention.

## Data Ingestion
To provide routing information, we used the Google Maps API to first geocode the user specified origin and destination locations into geographic coordinates which we could then integrate with the Graphhopper service to provide possible routes. This allows us to still optimise for distance and duration, while taking heat and green cover as additional heuristics.
To retrieve data for the expected temperature deviation and green cover, we integrated with the ArcGIS MapServer REST API. Using a list of geographic coordinates along the route, we query the GIS dataset to retrieve temperature and green cover data. In particular, we used the following fields:

- Mean Urban Heat Index temperature deviation from vegetated areas
- Percentage of green cover on a block area
- Ratio of green cover to block area
in addition to geographical data about the area the data applies to. Once we have retrieved the data, this is aggregated for each route alternative, and metrics such as the average is calculated. 

## Possible extensions
A great improvement would be to use the UHI and Green Cover data as a heuristic for a custom routing algorithm. This would allow selection of route alternatives based on the user’s preference for green cover or temperature.
Integration with weather data would also be an interesting project, as the algorithm could optimise for low heat during high heat days, and high vegetation cover during days of precipitation.

## Data sets
- NSW Urban Heat Island to Modified Mesh Block 2016 
  - https://datasets.seed.nsw.gov.au/dataset/nsw-urban-heat-island-to-modified-mesh-block-2016
  - Extracted from REST API on demand.
- NSW Urban Vegetation Cover to Modified Mesh Block 2016 
  - https://datasets.seed.nsw.gov.au/dataset/nsw-urban-vegetation-cover-to-modified-mesh-block-2016
  - Extracted from REST API on demand.

## Members
- Aqeel Akber aqeel@thaum.com.au 
- Prithvi Reddy prithvi@thaum.com.au 
- Mahasen Sooriyabandara mahasen@thaum.com.au 
- Frank Zhao frank@frankzhao.net 
