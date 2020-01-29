FROM reactnativecommunity/react-native-android
LABEL maintainer="Parvez M Robin"

RUN yes | sdkmanager "platforms;android-27" \
    "platforms;android-26" \
    "platforms;android-25" \
    "platforms;android-24" \
    "platforms;android-23"

RUN yes | sdkmanager "build-tools;27.0.3" \
    "build-tools;26.0.3" \
    "build-tools;25.0.3" \
    "build-tools;24.0.3" \
    "build-tools;23.0.3"

WORKDIR /tmp

ADD . /tmp

RUN yarn jetify

RUN yarn bundle

RUN yarn make-unix

RUN rm -rf /tmp

WORKDIR /app

CMD /bin/bash
