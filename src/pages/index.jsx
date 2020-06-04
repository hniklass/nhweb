import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import moment from 'moment';
import { Container, Row, Col } from 'react-bootstrap';
import apiInstance from '../utils/api-instance';
import ProjectBlock from '../components/project-block/project-block';
import classes from './index.module.scss';

const Home = () => {
  const [skills, setSkills] = useState(undefined);
  const [workExp, setWorkExp] = useState(undefined);
  const [resume, setResume] = useState(undefined);
  const [latestProjects, setLatestProjects] = useState(undefined);
  const [latestPosts, setLatestPosts] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await axios.all([
        apiInstance.get('/skillsets'),
        apiInstance.get('/experiences?_limit=3&_sort=current:desc,start_date:desc,end_date:desc'),
        apiInstance.get('/resumes?_limit=1'),
        apiInstance.get('/projects?_limit=3'),
        axios.get('https://dev.to/api/articles?username=hniklass?per_page=3'),
      ])
        .then(axios.spread(
          (fetchedSkills, fetchedExperiences, fetchedResume, fetchedProjects, fetchedPosts) => {
            setSkills(fetchedSkills.data);
            setWorkExp(fetchedExperiences.data);
            setResume(fetchedResume.data);
            setLatestProjects(fetchedProjects.data);
            setLatestPosts(fetchedPosts.data);
            setLoading(false);
          },
        ))
        .catch(() => {
          setLoading(false);
        });
    })();
  }, []);

  return (
    <>
      <div className={classes.Top}>
        <div className={classes.ContentWrapper}>
          <div className={classes.Image}>
            <img src="https://picsum.photos/200" alt="" />
          </div>

          <div className={classes.Content}>
            <h1 className="highlight-variation big-size">Hello!</h1>
            <h1 className="white big-size">I am Nicolas</h1>

            <div>
              <button type="button">PLACEHOLDER</button>
              <button type="button">PLACEHOLDER</button>
            </div>
          </div>
        </div>
      </div>

      <Container className={clsx(classes.Description, 'my-5 py-5')}>
        <Row>
          <Col>
            <h3 className="px-md-5 text-center">
              I am a Computer Systems Engineer that does stuff and whatever
              after all, this is a sample text. So it&apos;s not like it matters what
              I write here.
            </h3>
          </Col>
        </Row>
      </Container>

      <Container className={classes.MidPart}>
        <Row>
          <Col xs={{ span: 12, order: 2 }} md={{ span: 6, order: 1 }}>
            <div className={clsx(classes.SkillsAndEducation, 'pr-md-5')}>
              <h2 className="text-center text-md-right highlight">Things I can do</h2>

              <div className={clsx(classes.Skills, 'my-4')}>
                <h3 className="text-center text-md-right">Front-End Engineering</h3>
                {
                  !loading
                  && skills
                  && skills.length > 0
                  && skills.filter((skill) => skill.type === 'front').map((skill) => (
                    <p key={skill.id} className="text-center text-md-right">{skill.skill}</p>
                  ))
                }

                <h3 className="text-center text-md-right mt-5">Back-End Engineering</h3>
                {
                  !loading
                  && skills
                  && skills.length > 0
                  && skills.filter((skill) => skill.type === 'back').map((skill) => (
                    <p key={skill.id} className="text-center text-md-right">{skill.skill}</p>
                  ))
                }

                <h3 className="text-center text-md-right mt-5">Software Operations</h3>
                {
                  !loading
                  && skills
                  && skills.length > 0
                  && skills.filter((skill) => skill.type === 'ops').map((skill) => (
                    <p key={skill.id} className="text-center text-md-right">{skill.skill}</p>
                  ))
                }

                <h3 className="text-center text-md-right mt-5">Other Skills</h3>
                {
                  !loading
                  && skills
                  && skills.length > 0
                  && skills.filter((skill) => skill.type === 'other').map((skill) => (
                    <p key={skill.id} className="text-center text-md-right">{skill.skill}</p>
                  ))
                }
              </div>

              <div className={classes.Education}>
                <div className={clsx(classes.University, 'my-5', 'text-center', 'text-md-right')}>
                  <h2 className="text-center text-md-right highlight">Education</h2>
                  <h4 className="text-center text-md-right">BSc. Computer Systems Engineering</h4>
                  <p className="text-center text-md-right">
                    Santiago Mariño Polytechnic University Institute
                  </p>
                  <p className="text-center text-md-right">Class of 2019 - Valedictorian</p>
                </div>
              </div>
            </div>
          </Col>

          <Col xs={{ span: 12, order: 1 }} md={{ span: 6, order: 2 }}>
            <div className={clsx(classes.WorkExperience, 'mb-5', 'mb-md-0', 'pl-md-5')}>
              <h2 className="text-center text-md-left highlight">Work experience</h2>

              {
                loading && <p>Loading...</p>
              }

              {
                !loading && (!workExp || !workExp.length) && <p>No data...</p>
              }

              {
                !loading && workExp && workExp.length && workExp.slice(0, 3).map((experience) => (
                  <div key={experience.id} className={clsx(classes.Work, 'my-4')}>
                    <h3>{experience.position}</h3>
                    <h4>{experience.name}</h4>
                    <p className="m-0">{`${experience.location}`}</p>
                    <p>
                      {
                        `(${moment(experience.start_date).format('YYYY/MM')} - `
                        + `${experience.current
                          ? 'Current'
                          : moment(experience.end_date).format('YYYY/MM')
                        })`
                      }
                    </p>
                    <ul className="pl-4">
                      {
                        experience.description.split('\n').map((value, index) => (
                          /* eslint-disable-next-line react/no-array-index-key */
                          <li key={index} className="pr-lg-5 pr-xl-3 text-justify">{value}</li>
                        ))
                      }
                    </ul>
                  </div>
                ))
              }
            </div>
          </Col>
        </Row>
      </Container>

      <div className={clsx(classes.Projects, 'my-5')}>
        <Container className="py-5">
          <h2 className="highlight-variation text-center">Check out some of my most recent projects</h2>

          <p className="px-md-5 white text-center">
            Nowadays I mostly work on webdev, but I&apos;ve done my fair share of other project.
            The most recent ones shown here. Filler text Filler text Filler text.
            There are also some vanity projects not shown here that can be found
            on my github page.
          </p>

          <Row className="mt-5 justify-content-center">
            {
              !loading && (!latestProjects || !latestProjects.length) && (
                <Col>
                  <h3 className="white text-center">
                    Apparently there are no projects published :(
                  </h3>
                </Col>
              )
            }

            {
              !loading
              && latestProjects
              && latestProjects.length > 0
              && latestProjects.map((project, index) => (
                <Col xs={12} md={6} lg={4}>
                  <ProjectBlock
                    title={project.title}
                    slug={project.slug}
                    mainPhoto={project.main_photo}
                    className={
                      `${index > 0 ? 'mt-4 mt-md-0' : ''}${index > 1 ? ' d-none d-lg-block' : ''}`
                    }
                  />
                </Col>
              ))
            }
          </Row>

          {
            !loading
            && latestProjects
            && latestProjects.length > 0
            && <button type="button" className="d-block mt-3 mx-auto">PLACEHOLDER</button>
          }
        </Container>
      </div>

      <Container className={clsx(classes.Blog, 'py-5')}>
        <h2 className="text-center">My latest posts</h2>

        <p className="px-md-5 text-center">
          Nowadays I mostly work on webdev, but I&apos;ve done my fair share of other project.
          The most recent ones shown here. Filler text Filler text Filler text.
          There are also some vanity projects not shown here that can be found
          on my github page.
        </p>

        <Row className="mt-5 justify-content-center">
          {/*
            TODO: Fix blog dynamic data based on Dev.to API fetched object.
          */}

          {
            !loading && (!latestPosts || !latestPosts.length) && (
              <Col>
                <h3 className="text-center">
                  Apparently there are no posts published :(
                </h3>
              </Col>
            )
          }

          {
            !loading
            && latestPosts
            && latestPosts.length > 0
            && latestPosts.map((post, index) => (
              <Col xs={12} md={6} lg={4}>
                <div
                  className={
                    clsx(classes.Post, index > 0 && 'mt-4 mt-md-0', index > 1 && 'd-none d-lg-block')
                  }
                >
                  <a href="#.">
                    <div className={classes.Image}>
                      <img src="https://picsum.photos/200" alt="" />
                    </div>

                    <div className={clsx(classes.Data, 'mt-4')}>
                      <small className="highlight text-center d-block">TEST CATEGORY</small>
                      <p className="text-center d-block">TEST SHORT NAME</p>
                    </div>
                  </a>
                </div>
              </Col>
            ))
          }
        </Row>

        {
          !loading
          && latestPosts
          && latestPosts.length > 0
          && <button type="button" className="d-block mx-auto mt-3">PLACEHOLDER</button>
        }
      </Container>

      <div className={clsx(classes.Contact, 'mt-5')}>
        <div className={classes.Image}>
          <img src="https://picsum.photos/200" alt="" />
        </div>

        <div className={classes.Cover} />

        <Container className={clsx(classes.Container, 'py-5')}>
          <Row>
            <Col>
              <h2 className="text-center highlight-variation">Need to contact me? Send me a message!</h2>

              <h3 className="text-center white px-md-5 my-3">
                Send me a message and I&apos;ll get back to you as soon as possible.
                Whether it is to say hello, ask for a quote, an inquiry or anything else.
              </h3>
            </Col>
          </Row>

          <button type="button" className="d-block mx-auto mt-3">PLACEHOLDER</button>
        </Container>
      </div>


    </>
  );
};

export default Home;