import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const TrackSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Piano Sonata No. 7"),
    artist: Joi.string().required().example("Beethoven"),
    duration: Joi.number().allow("").optional().example(12),
    countyid: IdSpec,
  })
  .label("Track");

export const TrackSpecPlus = TrackSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("TrackPlus");

export const TrackArraySpec = Joi.array().items(TrackSpecPlus).label("TrackArray");

export const CountySpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Beethoven Sonatas"),
    userid: IdSpec,
    tracks: TrackArraySpec,
  })
  .label("County");

export const CountySpecPlus = CountySpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("CountyPlus");

export const CountyArraySpec = Joi.array().items(CountySpecPlus).label("CountyArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");
