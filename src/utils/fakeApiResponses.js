export async function doLogin() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    login: {
      access_token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMjcyNjIzZjNlNmU5ZTMxYTg0MmNkMDViMjFhMDczZTA2YTVlY2E2OTdiMmQwZmFhMmI5YTg1NzAyMTk0MjU3M2M4Y2FhMmI5MTA4ZGRhN2YiLCJpYXQiOjE3MjQzNjkzNzguMjAxNzc4LCJuYmYiOjE3MjQzNjkzNzguMjAxNzgsImV4cCI6MTc1NTkwNTM3OC4xODc5OTksInN1YiI6IjEiLCJzY29wZXMiOltdfQ.k8AvVzmpTt8nYfnsZ1czXhGcbDAIWTHbDAwGjxXjPCQmSh6FdfPAc9qfnh9m2MGWphf_hb9pidKC0BXCk7NvURmRmmQu7fJaTHUic3lI-Izg6M2hUXDxm79dpoOr2nx-GylIwUnaJFKsfFxwyvA8nCYuqytKGQrxhd_6yLBtj72VBLQtsUzvseEL2ROKwCLt1gRxBczkZURYvYA1YPTaulSQ-UNDgu9a2ZcU9-DZDUicxToz1KZ5eCiyAI2LVZo7oiXnUSCNbtIxP7Mf1_lMpkAybvB8f8RNLLsJPQkJt2MbNFk_tj5yIpqTNG8tgrZUTEXhAAYME3kLDoU-mKlZYZf1bkXyUYU_hYwA8X7KDkqVMg1pu7kMRQAYNOK2EyRVXFYNb3Tv6UUJ0Y1Q8HSzhV-ODFQoWIprtlrV5VzMP7ItaCZcMR1WrGWsJ8jJCfRFWIYVuIj7secF-2-bRkBVMPV2W45D__iTGZS9fFXAg30HOHi6Z0RiS_U12ZnE4KHK3zwe8zZ8ZIOou1tCYMn3bEz88H_Ks7rs62WcoppAOomO6jXF14OYKBXe0AbGykIkJ1zYQev8nesIfQBCaUexf3trlWcCRvpqWFxH8YHgEvinqpssC6e41amKA-1vZ3wBeK4fUVKj1CEg15rOyk1yQ3Fm5oJVz0PI5t9hn6QePus",
      token_type: "Bearer",
      expires_at: "2025-08-22 23:29:38",
    },
    user: {
      id: 1,
      is_client: 1,
      name: "Vioscar Rivero",
      email: "szchmausser@gmail.com",
      email_verified_at: "2024-08-18T23:24:03.000000Z",
      created_at: "2024-08-18T23:24:03.000000Z",
      updated_at: "2024-08-18T23:24:03.000000Z",
    },
    company: {
      company_id: "1",
    },
    roles: [
      {
        id: 1,
        company_id: 1,
        name: "role1",
        guard_name: "api",
        created_at: "2024-08-18T23:28:39.000000Z",
        updated_at: "2024-08-18T23:28:39.000000Z",
        pivot: {
          model_id: 1,
          role_id: 1,
          model_type: "App\\Models\\User",
        },
      },
    ],
    permissions: [
      {
        id: 1,
        name: "permission1",
        guard_name: "api",
        created_at: "2024-08-18T23:29:50.000000Z",
        updated_at: "2024-08-18T23:29:50.000000Z",
        pivot: {
          role_id: 1,
          permission_id: 1,
        },
      },
      {
        id: 2,
        name: "permission2",
        guard_name: "api",
        created_at: "2024-08-18T23:29:54.000000Z",
        updated_at: "2024-08-18T23:29:54.000000Z",
        pivot: {
          model_id: 1,
          permission_id: 2,
          model_type: "App\\Models\\User",
        },
      },
    ],
  };
}
