pipeline {
    agent {node { label 'slave' }}
    stages{
        stage("one") {
            steps{
                script{
                    sh 'echo "hola0"'
                }
            }
        }
        stage("two") {
            steps{
                script{
                    sh 'echo "hola1"'
                }
            }
        }
        stage("three") {
            steps{
                script{
                    sh 'echo "hola2"'
                }
            }
        }
    }
}
