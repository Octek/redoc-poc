import { observer } from 'mobx-react';
import * as React from 'react';

import { AppStore } from '../../services/AppStore';

import { MiddlePanel, Row, Section } from '../../common-elements/';

export interface ApiInfoProps {
  store: AppStore;
}

@observer
export class ApiInfo extends React.Component<ApiInfoProps> {
  handleDownloadClick = e => {
    if (!e.target.href) {
      e.target.href = this.props.store.spec.info.downloadLink;
    }
  };

  render() {
    return (
      <Section>
        <Row>
          <MiddlePanel className="api-info">
            {/* UAPI-REDOC_003 */}
            {/* <ApiHeader>
              {info.title} {version}
            </ApiHeader>
            {!hideDownloadButton && (
              <p>
                {l('downloadSpecification')}:
                <DownloadButton
                  download={downloadFilename || true}
                  target="_blank"
                  href={downloadLink}
                  onClick={this.handleDownloadClick}
                >
                  {l('download')}
                </DownloadButton>
              </p>
            )}
            <StyledMarkdownBlock>
              {((info.license || info.contact || info.termsOfService) && (
                <InfoSpanBoxWrap>
                  <InfoSpanBox>
                    {email} {website} {license} {terms}
                  </InfoSpanBox>
                </InfoSpanBoxWrap>
              )) ||
                null}
            </StyledMarkdownBlock>
            <Markdown source={store.spec.info.summary} data-role="redoc-summary" />
            <Markdown source={store.spec.info.description} data-role="redoc-description" />}
            { {externalDocs && <ExternalDocumentation externalDocs={externalDocs} />} */}
          </MiddlePanel>
        </Row>
      </Section>
    );
  }
}
