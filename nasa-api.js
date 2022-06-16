import { createServer } from "@graphql-yoga/node";
import fetch from "node-fetch";

const TypeDefs = `
  type Query {
    ping: String
    asteroidsNws: AsteroidsNws
  }
  type AsteroidsNws{
    element_count: Int,
    near_earth_objects: NearEarthObjects,
    links: Links
  }
  type Links{
    next: String,
    prev: String,
    self: String
  }
  type MissDistance {
    astronomical: String,
    lunar: String,
    kilometers: String,
    miles: String
  },
  type RelativeVelocity {
    kilometers_per_second: String,
    kilometers_per_hour: String,
    miles_per_hour: String
  },
  type CloseApproachData {
    close_approach_date: String,
    close_approach_date_full: String,
    epoch_date_close_approach: Int,
    orbiting_body: String,
    miss_distance: MissDistance,
    relative_velocity: RelativeVelocity
  },
  type Feet {
    estimated_diameter_min: Float,
    estimated_diameter_max: Float
  },
  type Miles {
    estimated_diameter_min: Float,
    estimated_diameter_max: Float
  },
  type Meters {
    estimated_diameter_min: Float,
    estimated_diameter_max: Float
  },
  type Kilometers {
    estimated_diameter_min: Float,
    estimated_diameter_max: Float
  },
  type EstimatedDiameter {
    feet: Feet,
    miles: Miles,
    meters: Meters,
    kilometers: Kilometers
  },
  type Today {
    id: String,
    neo_reference_id: String,
    name: String,
    nasa_jpl_url: String,
    absolute_magnitude_h: Float,
    is_potentially_hazardous_asteroid: Boolean,
    is_sentry_object: Boolean,
    close_approach_data: [CloseApproachData],
    estimated_diameter: EstimatedDiameter,
    links: Links
  },
  type NearEarthObjects {
    today: [Today]
  }
`

const resolvers = {
  Query: {
    ping: () => 'pong',
    asteroidsNws: async() => {
      try {
        let resp = await fetch('https://api.nasa.gov/neo/rest/v1/feed?start_date=2022-06-15&end_date=2022-06-15&api_key=DEMO_KEY');
        resp =  await resp.text();
        resp = resp.replaceAll("2022-06-15", "today");
        resp = JSON.parse(resp);
        return resp;
      } catch (error) {
        throw new Error(error);
      }
    }
  },
}

// Provide your schema
const server = createServer({
  schema: {
    typeDefs: TypeDefs,
    resolvers: resolvers,
  },
})

// Start the server and explore http://localhost:4000/graphql
server.start()