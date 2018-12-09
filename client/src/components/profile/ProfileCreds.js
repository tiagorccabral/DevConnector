import React, {Component} from 'react';
import Moment from 'react-moment';

class ProfileCreds extends Component {
    render () {
        const {experience, education} = this.props;

        const expItems = experience.map(exp => (
            <li key={exp._id} className="list-group-item">
                <h4>{exp.company}</h4>
                <p>
                    <Moment format="DD/MM/YYYY">{exp.from}</Moment> -
                    {exp.to === null ? (' Atual'): (<Moment format="DD/MM/YYYY">{exp.to}</Moment>)}
                </p>
                <p><strong>Posição:</strong> {exp.title}</p>
                <p>
                    {exp.location === '' ? null: (<span><strong>Localização:</strong> {exp.location}</span>)}
                </p>
                <p>
                    {exp.description === '' ? null: (<span><strong>Descrição:</strong> {exp.description}</span>)}
                </p>
            </li>
        ));

        const eduItems = education.map(edu => (
            <li key={edu._id} className="list-group-item">
                <h4>{edu.school}</h4>
                <p>
                    <Moment format="DD/MM/YYYY">{edu.from}</Moment> -
                    {edu.to === null ? (' Atual'): (<Moment format="DD/MM/YYYY">{edu.to}</Moment>)}
                </p>
                <p><strong>Graduação/Certificação:</strong> {edu.degree}</p>
                <p><strong>Área de estudo</strong> {edu.fieldOfStudy}</p>
                <p>
                    {edu.description === '' ? null: (<span><strong>Descrição:</strong> {edu.description}</span>)}
                </p>
            </li>
        ));
        return (
            <div className="row">
                <div className="col-md-6">
                    <h3 className="text-center text-info">
                        Experiências
                    </h3>
                    {expItems.length > 0 ? (
                        <ul className="list-group">
                            {expItems}
                        </ul>
                    ) : (
                        <p className="text-center">Nenhuma experiência listada</p>
                    )}
                </div>
                <div className="col-md-6">
                    <h3 className="text-center text-info">
                        Educação
                    </h3>
                    {eduItems.length > 0 ? (
                        <ul className="list-group">
                            {eduItems}
                        </ul>
                    ) : (
                        <p className="text-center">Nenhuma informação listada</p>
                    )}
                </div>
            </div>
        );
    }
}

export default ProfileCreds;
