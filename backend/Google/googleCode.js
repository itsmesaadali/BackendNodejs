const googleAuth = asyncHandler(async (req, res) => {
    const { token } = req.body;

    if (!token) {
        throw new ApiError(400, "Google authentication token is required");
    }

    try {
        // Verify Google token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        
        const {
            sub: googleId,
            email,
            name: fullname,
            picture: avatar
        } = ticket.getPayload();

        if (!email) {
            throw new ApiError(400, "Google account email is required");
        }

        // Generate username from email (before @)
        const username = email.split('@')[0].toLowerCase();

        // Check for existing user
        let user = await User.findOne({ 
            $or: [{ email }, { googleId }] 
        });

        if (!user) {
            // Create new user with Google data
            user = await User.create({
                username,
                email,
                fullname,
                avatar,
                googleId,
                isGoogleAuth: true,
                password: '' // Empty password for Google-authenticated users
            });
        } 

        // Generate tokens
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
        
        // Get user without sensitive fields
        const loggedInUser = await User.findById(user._id).select(
            "-password -refreshToken -watchHistory"
        );
        
        // Configure cookies
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        };
        
        return res
            .status(200)
            .cookie("accessToken", accessToken, cookieOptions)
            .cookie("refreshToken", refreshToken, cookieOptions)
            .json(
                new ApiResponse(
                    200,
                    {
                        user: loggedInUser,
                        accessToken,
                        refreshToken
                    },
                    "Google authentication successful"
                )
            );
    } catch (error) {
        console.error('Google authentication error:', error);
        throw new ApiError(
            error.statusCode || 401, 
            error.message || "Google authentication failed"
        );
    }
});




// const googleAuth = asyncHandler(async (req, res) => {
//     // This will redirect to Google's consent screen
//     passport.authenticate('google', {
//         scope: ['profile', 'email'],
//         session: false
//     })(req, res);
// });

// const googleAuthCallback = asyncHandler(async (req, res, next) => {
//     passport.authenticate('google', {
//         session: false
//     }, async (err, user, info) => {
//         if (err) {
//             throw new ApiError(500, err.message);
//         }
        
//         if (!user) {
//             throw new ApiError(400, info?.message || 'Google authentication failed');
//         }

//         const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

//         const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

//         const options = {
//             httpOnly: true,
//             secure: true
//         };

//         return res
//             .status(200)
//             .cookie("accessToken", accessToken, options)
//             .cookie("refreshToken", refreshToken, options)
//             .json(new ApiResponse(200, {
//                 user: loggedInUser,
//                 accessToken,
//                 refreshToken
//             }, "User logged in via Google successfully"));
//     })(req, res, next);
// });





// router.route('/auth/google').get(googleAuth);
// router.route('/auth/google/callback').get(googleAuthCallback);