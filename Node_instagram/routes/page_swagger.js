/**
 * @swagger
 * tags:
 *   name: Main
 *   description: 게시판 조회
 */

/**
 * @swagger
 * /:
 *   get:
 *    summary: "게시판 조회"
 *    description: "GET 방식을 통해 모든 게시물 조회"
 *    tags: [Main]
 *    parameters:
 *      - in: path
 *        name: page
 *        required: false
 *        description: 게시물 페이지
 *        schema:
 *          type: int
 *    responses:
 *      "200":
 *        description: 모든 게시물을 가져옵니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                twits:
 *                  type: object
 *                  example:
 *                    [
 *                      { "id": 1, "userId": "유저1", "userNick": "유저1nick", "userImg":"/uploads/1.png", "Img":"/uploads/asds.png"},
 *                      {  "id": 2, "userId": "유저2", "userNick": "유저2nick", "userImg":"/uploads/1.png", "Img":"/uploads/asds.png" },
 *                      {  "id": 3, "userId": "유저3", "userNick": "유저3nick", "userImg":"/uploads/1.png", "Img":"/uploads/asds.png" },
 *                    ]
 */




/**
* @swagger
* /search/:title:
* get:
*  	summary:
*	description:
*	tags:
*	paramters:
*	 - in: path
*		name: page
*		required: false
*		description: 게시물 페이지
*		schema:
*			type: int
*	responses:
*		"200":
*			description: 검색한 title의 태그를 가진 게시물을 가져옵니다.
*			content:
*				application/json:
*					schema:
*						type: object
*						properties:
*							title:
*								type: string
*							twits:
*								type: obect
*								example:
*								[
*									{ "id": 1, "userId": "유저1", "userNick": "유저1nick", "userImg":"/uploads/1.png", "Img":"/uploads/asds.png"},
*									{  "id": 2, "userId": "유저2", "userNick": "유저2nick", "userImg":"/uploads/1.png", "Img":"/uploads/asds.png" },
*									{  "id": 3, "userId": "유저3", "userNick": "유저3nick", "userImg":"/uploads/1.png", "Img":"/uploads/asds.png" },
*								]
*/