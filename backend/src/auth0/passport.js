import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../models/user.models.js';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/v1/users/auth/google/callback",
    passReqToCallback: true
},
async (req, accessToken, refreshToken, profile, done) => {
    try {
        // Check if user already exists in your DB
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
            // If user exists but signed up manually
            if (!user.googleId) {
                return done(null, false, { message: 'This email is already registered with manual login' });
            }
            return done(null, user);
        } else {
            // Create new user
            user = await User.create({
                googleId: profile.id,
                username: profile.emails[0].value.split('@')[0],
                email: profile.emails[0].value,
                fullname: profile.displayName,
                avatar: profile.photos[0].value,
                password: '', // No password for Google users
                isGoogleAuth: true
            });

            return done(null, user);
        }
    } catch (error) {
        return done(error, false);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, false);
    }
});

export default passport;