openapi: 3.0.3
info:
  title: Nodejs_Instagram
  description: |-
   처음으로 제작한 Swagger API
   
    _한칸 뛸려면 이렇게_
    
    Some useful links:
    - [link 거는 법](주소)
    
  termsOfService: http://swagger.io/terms/
  contact:
    email: leeminwok@naver.com
  version: 1.0.11
servers:
  - url: server URL
  
tags:
  - name: user
    description: 설명
    externalDocs:
      description: 설명
      url: 링크
    
paths:
  /user:
    post:
      tags:
        - user
      summary: Create user
      description: This can only be done by the logged in user.
      operationId: createUser
      requestBody:
        description: Created user object
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/User'
          application/xml:
            schema:
              $ref: '#/components/schemas/User'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/User'
      responses:
        default:
          description: successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
            application/xml:
              schema:
                $ref: '#/components/schemas/User'
  /user/createWithList:
    post:
      tags:
        - user
      summary: Creates list of users with given input array
      description: Creates list of users with given input array
      operationId: createUsersWithListInput
      requestBody:
        content:
          application/json:
            schema:
              type: array
              items:
                $ref: '#/components/schemas/User'
      responses:
        '200':
          description: Successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'          
            application/xml:
              schema:
                $ref: '#/components/schemas/User'
        default:
          description: successful operation
  /user/login:
    get:
      tags:
        - user
      summary: Logs user into the system
      description: ''
      operationId: loginUser
      parameters:
        - name: username
          in: query
          description: The user name for login
          required: false
          schema:
            type: string
        - name: password
          in: query
          description: The password for login in clear text
          required: false
          schema:
            type: string
      responses:
        '200':
          description: successful operation
          headers:
            X-Rate-Limit:
              description: calls per hour allowed by the user
              schema:
                type: integer
                format: int32
            X-Expires-After:
              description: date in UTC when token expires
              schema:
                type: string
                format: date-time
          content:
            application/xml:
              schema:
                type: string
            application/json:
              schema:
                type: string
        '400':
          description: Invalid username/password supplied
  /user/logout:
    get:
      tags:
        - user
      summary: Logs out current logged in user session
      description: ''
      operationId: logoutUser
      parameters: []
      responses:
        default:
          description: successful operation
  /user/{username}:
    get:
      tags:
        - user
      summary: Get user by user name
      description: ''
      operationId: getUserByName
      parameters:
        - name: username
          in: path
          description: 'The name that needs to be fetched. Use user1 for testing. '
          required: true
          schema:
            type: string
      responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'          
            application/xml:
              schema:
                $ref: '#/components/schemas/User'
        '400':
          description: Invalid username supplied
        '404':
          description: User not found
    put:
      tags:
        - user
      summary: Update user
      description: This can only be done by the logged in user.
      operationId: updateUser
      parameters:
        - name: username
          in: path
          description: name that need to be deleted
          required: true
          schema:
            type: string
      requestBody:
        description: Update an existent user in the store
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/User'
          application/xml:
            schema:
              $ref: '#/components/schemas/User'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/User'
      responses:
        default:
          description: successful operation
    delete:
      tags:
        - user
      summary: Delete user
      description: This can only be done by the logged in user.
      operationId: deleteUser
      parameters:
        - name: username
          in: path
          description: The name that needs to be deleted
          required: true
          schema:
            type: string
      responses:
        '400':
          description: Invalid username supplied
        '404':
          description: User not found
          
          
components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
          format: int64
          example: 1
        email:
          type: string
          format: email
          example: test@test
        nick:
          type: string
          example: "test_nick"
        password:
          type: string
          format: hash
        provider:
          type: string
          example: 'local'
        snsId:
          type: string
        img:
          type: string
          example: '/img/1.png'
      xml:
        name: user

    Post:
      type: object
      proerties:
        id:
          type: integer
          format: int64
          example: 2
        userId:
          type:
          format:
          example:
        userNick:
          type:
          format:
          example:
        userImg:
          type:
          format:
          example:
        img:
          type:
          format:
          example:
        date:
          type:
          format:
          example:
      xml:
        name: post
      
    Hashtag:
      type: object
      proerties:
        id:
          type: integer
          format: int64
          example: 3
        title:
          type:
          format:
          example:
      xml:
        name: hashtag
        
    Domain:
      type: object
      proerties:
        id:
          type: integer
          format: int64
          example: 4
        userId:
          type:
          format:
          example:
        host:
          type:
          format:
          example:
        type:
          type:
          format:
          example:
        clientSecret:
          type:
          format:
          example:
      xml:
        name: domain

    Comment:
      type: object
      proerties:
        id:
          type: integer
          format: int64
          example: 5
        userId:
          type:
          format:
          example:
        userNick:
          type:
          format:
          example:
        userImg:
          type:
          format:
          example:
        postId:
          type:
          format:
          example:
        content:
          type:
          format:
          example:
        date:
          type:
          format:
          example:
      xml:
        name: comment
    
  requestBodies:
    Pet:
      description: Pet object that needs to be added to the store
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Pet'
        application/xml:
          schema:
            $ref: '#/components/schemas/Pet'
    UserArray:
      description: List of user object
      content:
        application/json:
          schema:
            type: array
            items:
              $ref: '#/components/schemas/User'
  securitySchemes:
    petstore_auth:
      type: oauth2
      flows:
        implicit:
          authorizationUrl: https://petstore3.swagger.io/oauth/authorize
          scopes:
            write:pets: modify pets in your account
            read:pets: read your pets
    api_key:
      type: apiKey
      name: api_key
      in: header